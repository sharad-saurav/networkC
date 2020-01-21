    var express = require('express');
    var router = express.Router();
    var request = require('request');
    var cors = require('cors');
    let app =  new express();
    var https = require("https");
    var Github = require("../models/github");
    var async = require('async');

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


        body = JSON.parse(body);
        console.log("hahaha",body.length, body[0]);
        async.each(body, function (singleData, callback) {
            console.log("singleData----", singleData);
            var github = new Github(singleData);
            github.save(function(err, data){
                if(err){
                    callback(err);
                }else{
                    console.log('data---',data);
                    callback();
                }
            })
        }, function (err) {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(200).send("successfull");
            }
        });

        });
    });
    request.end();
    });

    app.get('/github/:id', function(req, res) {
          Github.findOne({"id": req.params.id}).exec().then(data=>{
                console.log(data);
                res.status(200).send(data);
          }).catch(error =>{
              res.status(400).send(error)
          })
    })


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
