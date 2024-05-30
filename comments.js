// Create web server
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var commentsPath = __dirname + '/comments.json';

// Set up the server
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/comments', function(req, res) {
    fs.readFile(commentsPath, 'utf8', function(err, data) {
        if (err) {
            console.log(err);
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

app.post('/comments', function(req, res) {
    fs.readFile(commentsPath, 'utf8', function(err, data) {
        if (err) {
            console.log(err);
            return;
        }
        var comments = JSON.parse(data);
        comments.push(req.body);
        fs.writeFile(commentsPath, JSON.stringify(comments, null, 4), function(err) {
            if (err) {
                console.log(err);
                return;
            }
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(comments));
        });
    });
});

app.listen(3000);
console.log('Server started: http://localhost:3000/');