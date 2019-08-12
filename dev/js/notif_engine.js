var NoJine = function() {
    if (typeof $ !== "undefined" || typeof jQuery !== "undefined") {
        class Nojine {
            constructor() {
                this.defaultMessage = "Hello world !";
                this.message = "";
                this.afterNotification = null;
            }

            init(options) {
                $.extend(this, options);

                this.setNextDirection();

                $("#" + this.target).append(
                    '<div class="notifOverlay overlayAll"><div class="dialog">'
                );

                this.composeDialog(options);
            }

            /*
              Triggers the notification animation
            */
            unNotify() {
                var duration, durationSec;
                var athis = this;

                $("#" + athis.target).addClass("passing");

                // get the duration regarding the
                // CSS to adapt to the fade out
                duration = $("#" + athis.target + " .dialog").css(
                    "transition-duration"
                );
                durationSec = /^(.*)s$/.exec(duration)[1];

                setTimeout(function() {
                    $("#" + athis.target).removeClass("revealed");

                    setTimeout(function() {
                        $("#" + athis.target).removeClass("displayed");
                        $("#" + athis.target).removeClass("passing");

                        $("#" + athis.target).empty();

                        if (athis.after != null) {
                            athis.after();
                        }
                    }, 500);
                }, durationSec * 1000);
            }

            notify() {
                var duration, durationSec;
                var athis = this;

                // wait a bit of time then display
                setTimeout(function() {
                    $("#" + athis.target).addClass("displayed");
                    $("#" + athis.target).addClass("revealed");

                    // get the duration regarding the
                    // CSS to adapt to the fade out
                    duration = $("#" + athis.target + " .dialog").css(
                        "transition-duration"
                    );
                    durationSec = /^(.*)s$/.exec(duration)[1];

                    if (athis.mode == "passing") {
                        setTimeout(function() {
                            athis.unNotify();
                        }, durationSec * 1000);
                    }
                }, 50);
            }

            setNextDirection() {
                var options = {
                    codeOnly: false,
                    from1: this.from,
                    type: this.type
                };
                if (this.type == "same") {
                    this.to = this.from;
                } else {
                    this.to = Cardinal.getNextDirection(options).trim();
                }
            }

            onModal(dialog, options) {
                options = this;
                if (options.description) {
                    dialog.append(options.description);
                }
                if (options.actions) {
                    var i = 0;
                    var athis = this;
                    var dialogSelector = "#" + athis.target + " .dialog";
                    var buttonGroupSelector = dialogSelector + " .button-group";

                    $(dialogSelector).append("<br><div class='button-group'>");

                    options.actions.forEach(function(e) {
                        if (i++ > 0) {
                            $(buttonGroupSelector).append('<span class="separation">');
                        }

                        var newHtml = '<button class="btn">' + e.label + "</button>";
                        var actionButton = $(newHtml).appendTo(buttonGroupSelector);

                        if (e.action) {
                            actionButton.click(e.action);
                        }
                    });
                }
            }
            composeDialog() {
                var dialog = $("#" + this.target).find(".dialog");
                dialog.attr("class", "dialog" + this.getDirectionclasses());
                dialog.append('<h2 class="message"/>');

                var athis = this;
                switch (this.mode) {
                    case "modal":
                        this.onModal(dialog);
                        break;
                    case "focused":
                        dialog.addClass("simple");
                        dialog.append(
                            '<div class="exitButton"><i class="fas fa-times"></i></div>'
                        );
                        $("#" + athis.target + " .exitButton").click(function() {
                            athis.unNotify();
                        });
                        break;
                }
            }

            getDirectionclasses() {
                var directionClasses = "";
                this.from.split(" ").forEach(function(d) {
                    directionClasses += " from-" + d;
                });
                this.to.split(" ").forEach(function(d) {
                    directionClasses += " to-" + d;
                });
                return directionClasses;
            }

            /*
            provide a custom notification message
            */
            setMessage(message) {
                // display the default message
                // if the custom message is not set
                if (message == "") {
                    this.message = this.defaultMessage;

                    // display the custom message
                } else {
                    this.message = message;
                }

                // replace the text of the element
                // displaying the message
                $("#" + this.target + " .message").text(this.message);
            }
        }
        return new Nojine();
    } else {
        throw "NoJine Lib. Cannot work without jQuery !";
    }
}.call(this);
