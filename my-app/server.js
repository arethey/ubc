const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const app = express();

var db;
MongoClient.connect('mongodb://ubc:ultrabiocorporation123@ds247430.mlab.com:47430/ubc', function (err, database) {
    if (err) return console.log(err);
    db = database;
    app.listen(3000, function () {
        console.log('Listening to port 3000');
    })
})

app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static(__dirname + '/build/bundled'));

app.get('/', function (req, res){
    // res.sendFile(__dirname + '/index.html');
    // var cursor = db.collection('accountlist').find().toArray(function(err, results){
    //     console.log(results);
    // })
});

app.post('/accountlist', function(req, res){
    db.collection('accountlist').save(req.body, function(err, result){
        if(err) return console.log(err);
        console.log('saved to db');
        res.redirect('/');
    })
})