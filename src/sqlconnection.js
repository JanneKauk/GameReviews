const express = require('express');
const app = express();
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
// app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
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
    console.log("test");

    con.query('SELECT * FROM games WHERE name like "' + str + '"', function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.post('/register', function (req, res) {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        const email = req.body.email;
        const username = req.body.username;
        const password = hash;

        con.query('INSERT INTO users (username, email, password) VALUES(?, ?, ?)', [username, email, password], function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        })
    });

});

app.post('/login', function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email);
    console.log(password);
    con.query('SELECT * FROM users WHERE email = ?', email, function(err, result) {
        if(err) throw err;
        if(result.length > 0) {
            console.log(result);
            console.log(JSON.stringify(result));
            console.log(result[0].password);
        }
        if(result.length > 0) {
            console.log(password);
            bcrypt.compare(password, result[0].password, function (err, compResult) {
                console.log("result");
                console.log(compResult);
                if(compResult === true) {

                    console.log(compResult);
                    res.send(compResult);
                }
            })
        } else {
            res.send('Failed');
        }
    }
    )
})


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})
