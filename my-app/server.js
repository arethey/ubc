var http = require('http');
var express = require('express');
var port = process.env.PORT || 8080;
var app = express();
var appRoutes = require('./routes/appRoutes');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var prpl = require('prpl-server');

mongoose.connect('mongodb://ubc:ultrabiocorporation123@ds247430.mlab.com:47430/ubc');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', appRoutes);
http.createServer(app).listen(port);

app.get('/', function (req, res){
    // res.sendFile(__dirname + '/index.html');
    // var cursor = db.collection('accountlist').find().toArray(function(err, results){
    //     console.log(results);
    // })
});
console.log('Listening to port:', port);

app.post('/accountlist', function(req, res){
    db.collection('accountlist').save(req.body, function(err, result){
        if(err) return console.log(err);
        console.log('saved to db');
        res.redirect('/');
    })
app.get('*', prpl.makeHandler('.', {
  builds: [
    { name: '/', browserCapabilities: ['es2015', 'push'] },
    { name: 'fallback' }
  ]
}))