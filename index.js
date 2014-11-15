var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 5000))

app.use(express.static(__dirname + '/'))

app.use(bodyParser.json())

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})