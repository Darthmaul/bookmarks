import JsSearch from 'js-search';
import Dispatcher from './dispatcher.js';

export default class Search {

	constructor({ bookmarks, lists }) {
		this.bookmarks = bookmarks;
		this.lists = lists;
		this.dispatcher = new Dispatcher();

		this.setUpSearchDispatcherEventHooks();
	}

	setUpSearchDispatcherEventHooks() {
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

	search(query) {
		const search = new JsSearch.Search('id');
		search.addIndex('title');
		search.addIndex('url');
		search.addIndex('tags');

		if (this.bookmarks) {
			search.addDocuments(this.bookmarks.all());
		}
		if (this.lists) {
			search.addDocuments(this.lists.all());
		}

		const results = search.search(query);
		this.triggerSearch(results);
	}

}