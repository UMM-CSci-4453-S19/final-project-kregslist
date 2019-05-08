var express = require('express'),

  mysql = require('mysql'),
  session = require('express-session'),
  bodyParser = require('body-parser'),
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
  var sql = 'select aji.post.*, aji.category.type, aji.user.* from aji.post join aji.category on aji.category.category_id = aji.post.category_id join aji.user on aji.user.user_id = aji.post.user_id;';

  console.log("getting posts");
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

app.get("/filter", function(req, res) {
  var cat = req.param('cat');
  var min = req.param('min');
  var max = req.param('max');


  var sql = "select aji.post.*, aji.category.type from aji.post join aji.category on aji.category.category_id = aji.post.category_id where aji.post.category_id="+cat+" and aji.post.price >="+min+" and aji.post.price <="+max+";";
  connection.query(sql, (function(res) {
    return function(err, rows, fields) {
      if (err) {
        console.log("We have an error getting the posts:");
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
  var user = req.param('user');

  console.log(user + title + desc + price + cat);

  //second argument is user, change later
  var sql = "insert into aji.post values (null,"+user+",'"+desc+"','"+title+"',null,"+price+","+cat+");"

  connection.query(sql, (function(res) {
    return function(err, rows, fields) {
      if (err) {
        console.log("Create post error:");
        console.log(err);
      }
      res.send(err);
    }
  })(res));
});

app.get("/user",function(req, res) {
  var username = req.param('username');
  var password = req.param('password');
  var firstn = req.param('firstn');
  var lastn = req.param('lastn');
  var email = req.param('email');

  var sql = "call aji.makeUser('"+firstn+"','"+lastn+"','"+email+"','"+username+"','"+password+"');";

  connection.query(sql, (function(res) {
    return function(err) {
      if (err) {
        console.log("Create user error:");
        console.log(err);
      }
      res.send(err);
    }
  })(res));
});

app.get("/delete",function(req, res) {
  var id = req.param('id');
  console.log(id);
  var sql = 'delete from aji.post where post_id='+id;

  connection.query(sql, (function(res) {
    return function(err) {
      if (err) {
        console.log("delete post error, post id:"+id);
        console.log(err)
      }
      res.send(err);
    }
  })(res))
});

app.get("/login", function(req, res){
 var username = req.param('username');
  var password = req.param('password');
  console.log("login attempt "+username);
   var sql = 'SELECT * FROM aji.login WHERE username = "' + username + '" and password = "' +password+ '"';

    connection.query(sql, (function(res) {
    return function(err, rows, fields) {
      if (rows.length > 0) {
        console.log("The username and the password are correct!");
        res.send(rows);
      //  console.log(rows);
      //  $scope.activeUser_html = true;
      }
      else {
      	console.log('Incorrect Username Password!');
          }
    }
  }
)(res));
});


app.listen(port);
