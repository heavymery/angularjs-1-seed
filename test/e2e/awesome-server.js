var express = require('express');
var app = express();

app.get('/api/awesome-things', function (req, res) {
  res.json([ 
    { title: 'HTML5 Boilerplate', description: 'HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.' },
    { title: 'AngularJS', description: 'AngularJS is a toolset for building the framework most suited to your application development.' },
    { title: 'Karma', description: 'Spectacular Test Runner for JavaScript.' }
  ]);
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});