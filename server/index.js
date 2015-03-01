var config = require('./config.json');

var express = require('express'),
    app = express(),
    swig = require('swig'),
    gcm = require('node-gcm');

function sendMsg(text, cb) {
  // Create a message
  var message = new gcm.Message({
      data: {
        message: text ? text : '<3',
        timestamp: Date.now()
      }
  });

  // Set up the sender with you API key
  var sender = new gcm.Sender(config.apiKey);

  sender.send(message, [config.regId], function (err, result) {
    if(err) cb(err);
    else cb(null, result);
  });
}

var bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(express.static(__dirname+'/assets'));

app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view cache', config.PRODUCTION);
swig.setDefaults({ cache: config.PRODUCTION });

function sendHandler(req, res) {
  sendMsg(req.body.msg, function(err, result) {
    if (err) {
      console.error(err);
      res.send(JSON.stringify(err));
    } else {
      res.send(JSON.stringify(result));
    }
  });
}

app.get('/send', sendHandler);

app.post('/send', sendHandler);

app.get('/', function(req, res) {
  res.render('index');
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('<3 listening at http://%s:%s', host, port);
});