var Show = function() {
    var self = null;
    class Show {
        constructor() {
            self = this;
        }

        init() {
            $(".directions button").click(function() {
                var inputCls = $(this)
                    .find("label")
                    .attr("for");

                if (inputCls) $("#" + inputCls)[0].click();
                self.setNextDirectionHighlight();
            });
            $("input[name='fading']").click(function() {
                self.setNextDirectionHighlight();
            });

            this.setNextDirectionHighlight();

            $(".notifier").click(this.trigger);
            //$(".notifier:first-child").click()
        }

        getFromDirection(isNormalized = true) {
            var chozenFromDirection = $("input[name=direction]:checked").val();
            var direction = /.(.{1,})/.exec(chozenFromDirection)[1];

            var guessCode = direction;
            if (isNormalized)
                return Cardinal.normalizeDirection(guessCode.toUpperCase());
            else return guessCode;
        }

        trigger() {
            this.blur();
            var chozenFromDirection = $("input[name=direction]:checked").val();
            var direction = /.(.{1,})/.exec(chozenFromDirection)[1];
            var dir = Cardinal.getReadable(self.getFromDirection());

            var options = {
                mode: $("input[name=mode]:checked").val(),
                from: dir.trim(),
                type: $("input[name=fading]:checked").val(),
                target: $(this).attr("data-cibling"),
                message: $("#inpMessage").val(),
                description: $("#description").val()
            };

            var optionFuncs = {
                after: function() {
                    $("#inpMessage").val("");
                },
                actions: [
                    {
                        label: "ok",
                        action: function() {
                            NoJine.unNotify();
                        }
                    },
                    {
                        label: "alert",
                        action: function() {
                            alert("hey !");
                        }
                    }
                ]
            };

            $.extend(options, optionFuncs);
            NoJine.init(options);

            NoJine.setMessage(options.message);
            NoJine.notify();
        }

        /*
        add the 'nextDirection' class to the guested next direction button
        so you can have a hint of the disappearing direction based on the
        movement flavour */
        setNextDirectionHighlight() {
            var nextDirectionCls =
                "d" +
                Cardinal.getDirectionCode(
                    Cardinal.getNextDirection({
                        from1: Cardinal.getReadable(self.getFromDirection().trim()),
                        type: $("input[name=fading]:checked").val()
                    }),
                    false
                );

            // remove the actual 'nextDirection' class
            $(".nextDirection").removeClass("nextDirection");

            // add the 'nextDirection' class to the guested next direction button
            $("." + nextDirectionCls).addClass("nextDirection");
        }
    }

    return new Show();
}.call(this);

Show.init();
