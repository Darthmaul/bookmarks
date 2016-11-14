import * as _ from '../../tools.js';

export default class Model {

	constructor(properties, collection) {
		_.extend(this, properties);
		this._collection = collection;
	}

	update(attrs) {
		this._collection.update(_.extend(this, attrs));
		return this;
	}

}