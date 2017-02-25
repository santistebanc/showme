//este archivo se encarga de la comunicación con la API de IBM
//cambios a este archivo no son detectados por el hot reload, se tiene que reiniciar la app


// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/build'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();


var watson = require('watson-developer-cloud');

var bodyParser  = require('body-parser');

app.use(bodyParser.json());


var visual_recognition = watson.visual_recognition({
  api_key: '38cd182687435487315c92363702c40b373969a9',
  version: 'v3',
  version_date: '2016-05-20'
});


//API
app.post('/recognize', function(req, res) {
  visual_recognition.classify({ url: req.body.url }, function(err, result) {
    if (err) {
      console.log(err);
      res.end();
    }
    else {
      console.log('success');
      res.send(result);
    }
  });
});

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
