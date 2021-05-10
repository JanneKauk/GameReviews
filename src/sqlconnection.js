require('dotenv').config();
const express = require('express');
const app = express();
const mysql = require('mysql');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const bcrypt = require('bcryptjs');
const saltRounds = 10;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const cors = require('cors');
const { body, validationResult } = require('express-validator');
/**
 * Create connection to sql database
 * @type {Connection}
 */
var con = mysql.createConnection({
    host: process.env.SQLHOST,
    user: process.env.SQLUSER,
    password: process.env.SQLPSW,
    database: process.env.SQLDB
});

app.use(cors({
    origin: ["http://localhost:8080"],
    methods: ["GET", "POST"],
    credentials: true
    }
));

app.use(cookieParser());

app.use(session({
    key: "userId",
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 1000 * 60 * 10,
    }
}))

/**
 * Try connecting
 */
con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM games", function (err) {
        if (err) throw err;
        console.log("SQL Connection successful")
    });
});
var url = require('url');
const { env } = require('process');
/**
 * Query for a gamelist ordered by str category
 */
app.get('/games', function (req, res) {
    let q = url.parse(req.url, true).query;
    let str = q.sortby;
    con.query("SELECT name, platforms, image, "+str+" AS score FROM games ORDER BY score DESC", function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.post('/addreview',
    body('userID').isInt( {min: 1}),
    body('gameID').isInt({min: 1}),
    body('graphics').isInt({ min: 1}),
    body('content').isInt({ min: 1}),
    body('story').isInt({min: 1}),
    body('characters').isInt({min: 1}),
    body('playability').isInt({min: 1}),

    (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        con.query("SELECT * FROM reviews WHERE `game-id` = ?  and `user-id` = ?", [req.body.gameID, req.body.userID], (err, results) => {
            if(err) throw err;
            if(results.length !== 0) {
                res.send('Review already exists');
            }else{
                con.query("INSERT INTO reviews (`game-id`, `user-id`, title, reviewtext, graphics, characters, story, content, playability) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)", [req.body.gameID, req.body.userID, req.body.title, req.body.review, req.body.graphics, req.body.characters, req.body.story, req.body.content, req.body.playability], (err, result) => {
                    if (err) throw err;
                })
                /** Update game list scores based on reviews */
                con.query("UPDATE games SET games.graphics = ROUND((SELECT AVG(reviews.graphics) FROM reviews WHERE reviews.`game-id` = id),1),\n" +
                    "games.characters = ROUND((SELECT AVG(reviews.characters) FROM reviews WHERE reviews.`game-id` = id),1),\n" +
                    "games.story = ROUND((SELECT AVG(reviews.story) FROM reviews WHERE reviews.`game-id` = id),1),\n" +
                    "games.content = ROUND((SELECT AVG(reviews.content) FROM reviews WHERE reviews.`game-id` = id),1),\n" +
                    "games.playability = ROUND((SELECT AVG(reviews.playability) FROM reviews WHERE reviews.`game-id` = id),1),\n" +
                    "games.score = ROUND(((games.graphics + games.characters + games.story + games.content + games.playability)/5),1);\n", function (err) {
                    if (err) throw err;
                    res.send('success');
                });
            }
        })
})
/**
 * Query for a review list, limited to game id == str
 */
app.get('/gamereviews', function (req, res) {
    let q = url.parse(req.url, true).query;
    let str = q.sortby;
    con.query("SELECT users.username, title, reviews.reviewtext, graphics, characters, story, content, playability FROM reviews, users WHERE reviews.`game-id` = " + str + " AND users.id = reviews.`user-id`", function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});
/**
 * Query for all data from the game with name str
 */
app.get('/gamedetails', function (req, res) {
    let q = url.parse(req.url, true).query;
    let str = q.test;
    con.query('SELECT * FROM games WHERE name like "' + str + '"', function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.post('/register', function (req, res) {
    const email = req.body.email.toLowerCase();
    const username = req.body.username;
    con.query('SELECT * FROM users WHERE email = ?', email, function (err, existresult) {
        if(err) throw err;
        if(existresult.length <= 0) {
        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            const password = hash;
            con.query('INSERT INTO users (username, email, password) VALUES(?, ?, ?)', [username, email, password], function (err, result) {
                if (err) throw err;
                res.send(JSON.stringify({user: result[0].username}));
            })
        });
        }
    });
});

app.get('/login', (req, res) => {
    console.log(req.session.user);
    if (req.session.user) {
        res.send({loggedIn: true, user: req.session.user})
    } else {
        res.send({loggedIn: false});
    }
})

app.post('/login', function(req, res) {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    con.query('SELECT * FROM users WHERE email = ?', email, function(err, result) {
        if(err) throw err;
        if(result.length > 0) {
            bcrypt.compare(password, result[0].password, function (err, compResult) {
                if(compResult === true) {
                    console.log(result);
                    req.session.user = result;
                    console.log(req.session.user)
                    res.send(JSON.stringify({success: compResult, username: result[0].username, userID: result[0].id}));
                }
            })
        } else {
            res.send('Failed');
        }
    }
    )
})

app.post('/search', function(req, res) {
    let q = url.parse(req.url, true).query;
    let str = q.search.toLowerCase();
    con.query('Select * from games where name like ?','%' + str + '%', function(err, result) {
        if(err) throw err;
        res.send(result);
    })
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})
