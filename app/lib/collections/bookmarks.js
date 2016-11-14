import JsSearch from 'js-search';
import * as _ from '../tools.js';

import LocalStorageCollection from './base/localstorage.js';
import Bookmark from './bookmark.js';

import defaultBookmarks from './defaults.js';
import bookmarkValidator from './validators.js';

export default class Bookmarks extends LocalStorageCollection {

	constructor() {
		super();

		this.setUpSearchDispatcherEvents();
		this.setUpModelHooks();
		this.validator = bookmarkValidator;
	}

	get model() {
		return Bookmark;
	}

	defaultModels() {
		return defaultBookmarks;
	}

	setUpSearchDispatcherEvents() {
		this.onSearch = callback => {
			this.dispatcher.register('search', callback);
		};
		this.removeSearch = callback => {
			this.dispatcher.remove('search', callback);
		};
		this.triggerSearch = results => {
			this.dispatcher.broadcast('search', results);
		};
	}

	setUpModelHooks() {
		this.preCreate(model => {
			model.date = new Date;
			return model;
		});

		this.preCreate(model => {
			// prepend 'http://' to model.url if it isn't at beginning of string
			model.url = _.prependHttp(model.url);
			return model;
		});

		this.preCreate(model => {
			// add url properties to model;
			const details = _.getUrlDetails(model.url);
			model.domain = details.hostname;
			return model;
		});

		this.preCreate(model => {
			// turn model tags into an array if it is passed as a string
			if (_.isString(model.tags)) {
				model.tags = model.tags.split(',').map(tag => tag.trim()).filter(Boolean);
			}
			return model;
		});

		this.preCreate(model => {
			// ensure there are no duplicate tags
			model.tags = model.tags.filter((item, pos, arr) => arr.indexOf(item) == pos);
			return model;
		});

		this.preCreate(model => {
			// set slug
			model.slug = _.slugify(model.title);
			return model;
		});
	}

	findByTag(tag) {
		return this.all().filter(bookmark => bookmark.tags.indexOf(tag) >= 0);
	}

	search(query) {
		const search = new JsSearch.Search('id');
		search.addIndex('title');
		search.addIndex('url');
		search.addIndex('tags');

		search.addDocuments(this.all());
		const results = search.search(query);
		this.triggerSearch(results);
	}
	
}