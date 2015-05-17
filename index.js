var fs = require('fs');
var express = require('express');
var multer = require('multer');

var app = express();

var uploadMw = multer({
	dest: './uploads/',
	rename: function(fieldname, filename) {
		return new String(Date.now());
	}
});

app.post('/upload', uploadMw, function(req, res) {
	console.log(req.files);
	res.end('ok');
});

app.get('/', function(req, res) {
	res.end(fs.readFileSync('index.html'));
});

app.use(uploadMw);
app.listen(8888);