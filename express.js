var express = require('express'),
  mysql = require('mysql'),
  credentials = require('./credentials.json'),
  app = express(),
  port = process.env.PORT || 1337;

  //setup database credentials
credentials.host = 'ids.morris.umn.edu';

// setup the connection
var connection = mysql.createConnection(credentials);

// attempts to connect to database, returns
// error if not able to connect
connection.connect(function(err) {
  if (err) {
    console.log(error + " Hey you, I could not connect to the database.")
  }
});

// not sure what this is for
app.use(express.static(__dirname + '/public'));





app.listen(port);
