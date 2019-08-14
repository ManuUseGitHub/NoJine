/*
    provides a custom notification message with a colored icon
*/
NoJine.setMessage = function(message) {
    var html;

    // display the default message
    // if the custom message is not set
    if (message == "") {
        this.message = this.defaultMessage;
    }
    else if(Array.isArray(message) && message.length > 1){

        this.message = message[0];

        //if(/[0-9a-f]{4}/.test(message[1]) && message[2]){

        html = '<i class="fa" data-icon="&#x'+message[1][0]+';" style="color:'+message[1][1]+'"></i>'
        //}
    }
    // display the custom message
    else {
        this.message = message;
    }


    // replace the text of the element
    // displaying the message
    var targetMessage = $("#" + this.target + " .message");
    targetMessage.text(this.message);
    targetMessage.append(html);
}

var Complimenter = function(){
    var self = null;

    class Complimenter{
        constructor() {
            self = this;
            this.alreadySaid = [];
            this.compliments = [
                ['Gotta catch em all ! ... and you before all !!!',['f004','salmon']],
                ['You are praizable, really',['f654','lightblue']],
                ['You are beautiful !!!',['f004','salmon']],
                ['Do you know how awesome you are?',['f6d5','darkseagreen']],
                ['You are amazing!',['f091','gold']],
                ["You are unique!",['f577','magenta']],
                ['Someone loves you!',['f004','salmon']],
                ['You miss to someone everyday',['f5b3','darkslateblue']],
                ['The world would not be the same without you, I.G.W.',['f0c2','#333']],
                ['Someone could or does admire you somewhere',['f21e','red']],
                ['You are a precious one!',['f3a5','#efefef']],
                ['Be in a good mood everyday',['f599','gold']],
                ["Don't you know that there is a tale about you? It's your life!",['f02d','#df8e6d']],
                ["You can change the world if you have the will !!!",['f0ac','dodgerblue']],
                ["Someone made a wish upon stars to meet you",['f753',"orangered"]],
                ["You worth more than you think",['f4c0','lightblue']],
                ["You bring the sun to someone",['f185','#fa0']],
                ["You are the best",['f521','blue']],
                ["Everyone should be your friend!",['f234','darkorchid']],
                ["You are a cause to defend!",['f6de','gold']],
                ["You have a family",['f004','pink']],
                ["You were born with a mission : propagating happyness!",['f77d','pink']],
                ["Share your problems, you need to be understood",['f7a9','#aa1010']],
                ["If you where a Pokémon, I should better catch you!",['f21d','cornflowerblue']]
            ];
        }
        

        getNextRandomCompliment(){

            if(this.compliments.length==0){
                this.compliments = this.alreadySaid.slice(0);
                this.alreadySaid = [];
            }

            var nextIndex = Math.floor(Math.random()*this.compliments.length);
            var compliment = this.compliments[nextIndex];

            this.alreadySaid.push(compliment);
            this.compliments.splice(nextIndex,1);

            if(compliment.length == 1)
                compliment = compliment[0];
            return compliment;
        }
    }
    return new Complimenter();
}.call(this);


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

            $($('.notifier')[0]).click();//

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
            var dir = Cardinal.getReadable(self.getFromDirection());
            var message = $("#inpMessage").val();
            message = message.length ? message:Complimenter.getNextRandomCompliment();

            var options = {
                mode: $("input[name=mode]:checked").val(),
                from: dir.trim(),
                type: $("input[name=fading]:checked").val(),
                target: $(this).attr("data-cibling"),
                message: message,
                description: $("#description").val()
            };

            var optionFuncs = {
                after: function() {

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
