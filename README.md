![alt NoJine logo](https://github.com/ManuUseGitHub/NoJine/blob/master/demo/public/images/logo.svg.png)

# NoJine
A kind Notification Engine

## How to use it ?
1. download the demo folder
2. run it in your favorite local server

## How to configure ?
Here is an exemple inspired from the demo showcase.js in demo/public/assets/js. As shown bellow, create an object that stores options then pass these options to the NoJine init function
set a string mess

```Javascript
  
  var options = {
      mode: 'focussed',
      from: 'top right',
      type: 'opposite',
      target: 'div-covering-everything',
      message: $("#inpMessage").val(), // can be 'Y R th BST!',
      description: 'lorem ipsum and even html if you want',

      after: function() {
          // TODO: do something (here we decide to void the input containing the message)
          $("#inpMessage").val("");
      },
      
      // for every occurence, define a label to display and an action (do not forget to use unNotify to close the notifier)
      // exemples :
      
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

  NoJine.init(options);
  NoJine.notify();
```
