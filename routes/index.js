var express = require('express');
var router = express.Router();
var request = require('request');
var cors = require('cors');
let app =  new express();
var https = require("https");

app.use(cors())

/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});





app.get('/github', function(req, res) {
  var options = {
    host: 'api.github.com',
    path: '/users/mralexgray/repos',
    method: 'GET',
    headers: {'user-agent': 'node.js'}
  };

var request = https.request(options, function(response){
var body = '';
response.on("data", function(chunk){
    body += chunk
});

response.on("end", function(){
    res.send(body);
    });
});

request.end();
});



// app.get('/github', function(req, res) {
//   var options = {
//     host: 'api.github.com',
//     path: '/users/mralexgray/repos',
//     method: 'GET',
//     headers: {'user-agent': 'node.js'}
//   };

//   request(options, { json: true }, (err, response, body) => {
//       if (err) { 
//           console.log(err);
//           res.status(400).send(err);
//       } else {
//           console.log(body);
//           res.status(200).send(body);
//       }
//   })
// });

module.exports = app;
