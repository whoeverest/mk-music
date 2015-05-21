/// <reference path="../dts/lodash.d.ts" />
var db = require('./db');
var SongsCtrl = (function () {
    function SongsCtrl(uploadsRoot) {
        this.uploadsRoot = uploadsRoot;
    }
    SongsCtrl.prototype.createAll = function (files) {
        return db.songs.insert(files).exec();
    };
    SongsCtrl.prototype.all = function () {
        return db.songs.select().all();
    };
    return SongsCtrl;
})();
exports.SongsCtrl = SongsCtrl;
