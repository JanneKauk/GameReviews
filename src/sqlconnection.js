var express = require('express');
var app = express();
var mysql = require('mysql');

const cors = require('cors');

var con = mysql.createConnection({
    host: "mysql.metropolia.fi",
    user: "jannkauk",
    password: "beenis",
    database: "jannkauk"
});

app.use(cors());
con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM games", function (err) {
        if (err) throw err;
        console.log("MySql connection established successfully!");
    });
});
var url = require('url');
app.get('/games', function (req, res) {
    let q = url.parse(req.url, true).query;
    let str = q.sortby;
    console.log("category for sql query: "+str);
    con.query("SELECT name, platforms, image, "+str+" AS score FROM games ORDER BY score DESC", function (err, result) {
        if (err) throw err;
        console.log(result);
        console.log("Query successful");
        res.send(result);
    });
});

app.get('/gamedetails', function (req, res) {
    let q = url.parse(req.url, true).query;
    let str = q.test;
    console.log(str);
    console.log("test");

    con.query("SELECT * FROM games WHERE name like '" + str + "'", function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})
