import JsSearch from 'js-search';

import LocalStorageCollection from '../base/localstorage.js';
import * as _ from '../../tools.js';

import BookmarkModel from './model.js';
import defaultBookmarks from './defaults.js';
import bookmarkValidator from './validators.js';

export default class Bookmarks extends LocalStorageCollection {

	constructor() {
		super();

		this.setUpModelHooks();
	}

	get model() {
		return BookmarkModel;
	}

	get validator() {
		return bookmarkValidator;
	}

	defaultModels() {
		return defaultBookmarks;
	}

	setUpModelHooks() {
		this.preCreate(model => {
			model.date = new Date;

			// prepend 'http://' to model.url if it isn't already at beginning of string
			model.url = _.prependHttp(model.url);

			// add url properties to model;
			const details = _.getUrlDetails(model.url);
			model.domain = details.hostname;

			// turn model tags into an array if it is passed as a string
			if (_.isString(model.tags)) {
				model.tags = model.tags.split(',').map(tag => tag.trim()).filter(Boolean);
			}

			// ensure there are no duplicate tags
			model.tags = model.tags.filter((item, pos, arr) => arr.indexOf(item) == pos);
			
			// set slug
			model.slug = _.slugify(model.title);
			return model;
		});
	}

	findByTag(tag) {
		return this.all().filter(bookmark => bookmark.tags.indexOf(tag) >= 0);
	}
	
}