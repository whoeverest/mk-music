var anydb = require('anydb-sql');

var db = anydb({
	url: 'sqlite3://./db.sqlite'
});

var songs = db.define({
	name: 'songs',
	columns: {
		id: { primaryKey: true, dataType: 'number' },
		name: { dataType: 'text' },
		size: { dataType: 'number' },
		album: { dataType: 'text' },
		artist: { dataType: 'text' },
		path: { dataType: 'text' },
	}
});

songs.create().ifNotExists().exec();

module.exports = {
	songs: songs
};