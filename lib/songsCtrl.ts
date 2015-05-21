/// <reference path="../dts/lodash.d.ts" />

import _ = require('lodash');
import db = require('./db');

export class SongsCtrl {
	uploadsRoot: string;
	
	constructor(uploadsRoot: string) {
		this.uploadsRoot = uploadsRoot;
	}

	public createAll(files: string[]) {
		return db.songs.insert(files).exec()
	}

	public all() {
		return db.songs.select().all();
	}
}
