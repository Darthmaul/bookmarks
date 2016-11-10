import React from 'react';
import * as _ from '../../lib/tools.js';

// import styles for this component
require('!style!css!sass!./css/search.scss');

export default class SearchComponent extends React.Component {

	static contextTypes = {
		bookmarks: React.PropTypes.object,
		router: React.PropTypes.object
	};

	onSubmit(event) {
		event.preventDefault();
		this.search();
	}

	onKeyUp(event) {
		this.search();
	}

	search() {
		const { router, bookmarks } = this.context;
		const term = this.refs.search.value;
		let url;
		if (term) {
			url = _.setParams('/search', {
				query: term
			});
		} else {
			url = '/';
		}
		router.push(url);
	}

	componentWillReceiveProps() {
		const { router, bookmarks } = this.context;

		const location = router.location.query;
		const { query } = location;
		if (!query) {
			this.refs.search.value = '';
		}
	}

	render() {
		const { bookmarks, router } = this.context;

		const location = router.location.query;
		const { query } = location;
		return (
			<form onSubmit={this.onSubmit.bind(this)} onKeyUp={this.onKeyUp.bind(this)} className="search-form">
				<input placeholder="search" ref="search" type="text" className="field" defaultValue={query} />
			</form>
		);
	}

}