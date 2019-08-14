var NoJine = function() {
    if (typeof $ !== "undefined" || typeof jQuery !== "undefined") {
        var self = null;
        class Nojine {
            constructor() {
                self = this;
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

            setDefaultMessage(message){
                this.defaultMessage = message;
            }

            /*
              Triggers the notification animation
            */
            unNotify() {
                var duration, durationSec;

                $("#" + self.target).addClass("passing");

                // get the duration regarding the
                // CSS to adapt to the fade out
                duration = $("#" + self.target + " .dialog").css(
                    "transition-duration"
                );
                durationSec = /^(.*)s$/.exec(duration)[1];

                setTimeout(function() {
                    $("#" + self.target).removeClass("revealed");

                    setTimeout(function() {
                        $("#" + self.target).removeClass("displayed");
                        $("#" + self.target).removeClass("passing");

                        $("#" + self.target).empty();

                        if (self.after != null) {
                            self.after();
                        }
                    }, 500);
                }, durationSec * 1000);
            }

            notify() {
                var duration, durationSec;

                // wait a bit of time then display
                setTimeout(function() {
                    $("#" + self.target).addClass("displayed");
                    $("#" + self.target).addClass("revealed");

                    // get the duration regarding the
                    // CSS to adapt to the fade out
                    duration = $("#" + self.target + " .dialog").css(
                        "transition-duration"
                    );
                    durationSec = /^(.*)s$/.exec(duration)[1];

                    if (self.mode == "passing") {

                        // multiplier to let enough time to q regular reader to finish the reading
                        var readingTime = Math.ceil(self.message.length/15);

                        setTimeout(function() {
                            self.unNotify();
                        }, durationSec * 1000 * readingTime);
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
                    var dialogSelector = "#" + self.target + " .dialog";
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

                switch (this.mode) {
                    case "modal":
                        this.onModal(dialog);
                        break;
                    case "focused":
                        dialog.addClass("simple");
                        dialog.append(
                            '<div class="exitButton"><i class="fas fa-times"></i></div>'
                        );
                        $("#" + self.target + " .exitButton").click(function() {
                            self.unNotify();
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
                }

                // display the custom message
                else {
                    this.message = message;
                }

                // replace the text of the element
                // displaying the message
                var targetMessage = $("#" + this.target + " .message");
                targetMessage.text(this.message);
            }
        }
        return new Nojine();
    } else {
        throw "NoJine Lib. Cannot work without jQuery !";
    }
}.call(this);
