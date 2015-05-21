/// <reference path="dts/node.d.ts" />
/// <reference path="dts/express.d.ts" />
/// <reference path="dts/body-parser.d.ts" />
/// <reference path="dts/multer.d.ts" />
/// <reference path="dts/lodash.d.ts" />
/// <reference path="lib/songsCtrl.ts" />

import fs = require('fs');
import express = require('express');
import bodyParser = require('body-parser');
import multer = require('multer');
import _ = require('lodash');

import Songs = require('./lib/songsCtrl');
var SongsCtrl = new Songs.SongsCtrl('./uploads');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

var uploadMw = multer({
	dest: './uploads/',
	rename: function(fieldname, filename) {
		return new String(Date.now());
	}
});

app.post('/songs', uploadMw, function(req, res) {
	if (!req.files.songs) {
		throw new Error('No songs uploaded');
	}

	if (_.isObject(req.files.songs)) {
		req.files.songs = [req.files.songs];
	}

	SongsCtrl.createAll(req.files.songs.map(function(f) {
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
	SongsCtrl.all().then(function(songs) {
		res.json(songs);
	}).catch(function(e) {
		console.log(e);
		res.status(500).end('error')
	});
});

app.get('/', function(req, res) {
	res.end(fs.readFileSync('index.html'));
});

app.use(uploadMw);
app.listen(8888);

var x: string | number = 'asd';