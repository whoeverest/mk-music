/// <reference path="../dts/anydb-sql.d.ts" />
var anydb = require('anydb-sql');
var db = anydb({
    url: 'sqlite3://./db.sqlite'
});
exports.songs = db.define({
    name: 'songs',
    columns: {
        id: { primaryKey: true, dataType: 'integer' },
        name: { dataType: 'text' },
        size: { dataType: 'number' },
        album: { dataType: 'text' },
        artist: { dataType: 'text' },
        path: { dataType: 'text' }
    }
});
exports.songs.create().ifNotExists().exec();
