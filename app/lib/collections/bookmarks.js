import JsSearch from 'js-search';
import * as _ from '../tools.js';

import LocalStorageCollection from './localstorage.js';

export default class BookmarksCollection extends LocalStorageCollection {

	constructor() {
		super();

		this.setUpSearchDispatcherEvents();
		this.setUpPreCreateHooks();
	}

	shell() {
		return {
			title: '',
			url: '',
			tags: []
		}
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

	setUpPreCreateHooks() {
		this.preCreate(model => {
			model.url = _.prependHttp(model.url);
			const details = _.getUrlDetails(model.url);
			model.domain = details.hostname;
			return model;
		});
	}

	search(query) {
		const search = new JsSearch.Search('id');
		search.addIndex('title');
		search.addIndex('url');

		search.addDocuments(this.all());
		const results = search.search(query);
		this.triggerSearch(results);
	}
	
}