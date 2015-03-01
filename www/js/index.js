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
