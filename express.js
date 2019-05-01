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

app.use(express.static(__dirname + '/public'));

app.get("/post", function(req, res) {
  var sql = 'select aji.post.*, aji.category.type from aji.post join aji.category on aji.category.category_id = aji.post.category_id;';

  connection.query(sql, (function(res) {
    return function(err, rows, fields) {
      if (err) {
        console.log("We have an error getting the cart:");
        console.log(err);
      }
      res.send(rows);
    }
  })(res));
});

app.get("/category", function(req, res) {
  var sql = 'select * from aji.category';

  connection.query(sql, (function(res) {
    return function(err, rows, fields) {
      if (err) {
        console.log("We have an error getting the category:");
        console.log(err);
      }
      res.send(rows);
    }
  })(res));
});

app.get("/create",function(req, res) {
  var title = req.param('title');
  var desc = req.param('desc');
  var price = req.param('price');
  var cat = req.param('cat');

  console.log(title + desc + price + cat);

  //second argument is user, change later
  var sql = "insert into aji.post values (null,1,'"+desc+"','"+title+"',null,"+price+","+cat+");"

  connection.query(sql, (function(res) {
    return function(err, rows, fields) {
      if (err) {
        console.log("Create post error:");
        console.log(err);
      }
      res.send(err); // Let the upstream guy know how it went
    }
  })(res));
});





app.listen(port);
