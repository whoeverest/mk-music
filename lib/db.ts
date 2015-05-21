/// <reference path="../dts/anydb-sql.d.ts" />

import anydb = require('anydb-sql');

var db = anydb({
	url: 'sqlite3://./db.sqlite'
});

export var songs = db.define({
	name: 'songs',
	columns: {
		id: { primaryKey: true, dataType: 'integer' },
		name: { dataType: 'text' },
		size: { dataType: 'number' },
		album: { dataType: 'text' },
		artist: { dataType: 'text' },
		path: { dataType: 'text' },
	}
});

songs.create().ifNotExists().exec();
