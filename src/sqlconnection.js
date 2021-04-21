var express = require('express');
var app = express();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "mysql.metropolia.fi",
    user: "jannkauk",
    password: "beenis",
    database: "jannkauk"
});

con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM games", function (err) {
        if (err) throw err;
        console.log("MySql connection established successfully!");
    });
});

app.get('/games', function (req, res) {
    con.query("SELECT * FROM games", function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

// var server = app.listen(8080, function () {
//     var host = server.address().address
//     var port = server.address().port
//
//     console.log("Example app listening at http://%s:%s", host, port)
// })
