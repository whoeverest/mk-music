var _ = require('lodash');
var db = require('./db');

var SongsCtrl = function(uploadsRoot) {
	this.uploadsRoot = uploadsRoot;
};

SongsCtrl.prototype.createAll = function(files) {
	return db.songs.insert(files).exec();
};

SongsCtrl.prototype.all = function() {
	return db.songs.select().all();
}

module.exports = new SongsCtrl();