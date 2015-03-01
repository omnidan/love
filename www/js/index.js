var s = window.localStorage;

function successHandler (result) {
    console.log('PUSH RESULT:' + result);
}

function errorHandler (error) {
    console.log('PUSH ERROR:' + error);
}

function onNotification(e) {
    console.log('EVENT -> RECEIVED:' + e.event);

    switch( e.event )
    {
    case 'registered':
        if ( e.regid.length > 0 )
        {
            console.log('REGISTERED -> REGID:' + e.regid);
        }
    break;

    case 'message':
        // if this flag is set, this notification happened while we were in the foreground.
        // you might want to play a sound to get the user's attention, throw up a dialog, etc.
        if ( e.foreground )
        {
            console.log('--INLINE NOTIFICATION--');
        }
        else
        {  // otherwise we were launched because the user touched a notification in the notification tray.
            if ( e.coldstart )
            {
                console.log('--COLDSTART NOTIFICATION--');
            }
            else
            {
                console.log('--BACKGROUND NOTIFICATION--');
            }
        }
        
        addItem(e.payload.message);

        console.log('MESSAGE -> MSG: ' + e.payload.message);
    break;

    case 'error':
        console.log('ERROR -> MSG:' + e.msg);
    break;

    default:
        console.log('EVENT -> Unknown, an event was received and we do not know what it is</li>');
    break;
  }
}

function getHistory() {
  var history_raw = s.getItem("history");
  
  try {
    var history = JSON.parse(history_raw);
  } catch (err) {
    return [];
  }
  
  if (history instanceof Array) return history;
  if (typeof history === "string") return [history];
  else return [];
}

function flushHistory(history) {
  return s.setItem("history", JSON.stringify(history));
}

function addItem(msg) {
  var history = getHistory();
  history.unshift({msg: msg});
  document.querySelector('history-list').data = history;
  flushHistory(history);
}

function delItem(i) {
  var history = getHistory();
  history.splice(i, 1);
  document.querySelector('history-list').data = history;
  flushHistory(history);
}

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        var pushNotification = window.plugins.pushNotification;
        pushNotification.register(
            successHandler,
            errorHandler,
            {
                senderID: "326205247625",
                ecb: "onNotification"
            }
        );
    },
};