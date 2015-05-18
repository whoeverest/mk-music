var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');

var Songs = require('./lib/songsCtrl');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

var uploadMw = multer({
	dest: './uploads/',
	rename: function(fieldname, filename) {
		return new String(Date.now());
	}
});

app.post('/songs', uploadMw, function(req, res) {
	Songs.createAll(req.files.songs.map(function(f) {
		return {
			name: f.originalname,
			size: f.size,
			artist: req.body.artist,
			album: req.body.album,
			path: f.name,
		}
	})).then(function() {
		res.end('ok');
	}).catch(function(e) {
		console.log(e);
		res.status(500).end('error')
	});
});

app.get('/songs', function(req, res) {
	Songs.all().then(function(songs) {
		res.json(songs);
	}).catch(function(e) {
		console.log(e);
		res.status(500).end('error')
	});;
});

app.get('/', function(req, res) {
	res.end(fs.readFileSync('index.html'));
});

app.use(uploadMw);
app.listen(8888);