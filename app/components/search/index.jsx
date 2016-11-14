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

	componentWillReceiveProps(nextState, nextContext) {
		const { bookmarks } = this.context;
		const nextRouter = nextContext.router;
		const nextQuery = nextRouter.location.query;
		const nextTerm = nextQuery.query;
		const { value } = this.refs.search;
		if (nextTerm != value && value != undefined && nextTerm != undefined) {
			this.refs.search.value = '';
			this.refs.search.value = nextTerm;
		}

		if (nextTerm == undefined) {
			this.refs.search.value = '';
		}
	}

	search() {
		const { router, bookmarks } = this.context;
		const term = this.refs.search.value;
		const location = { pathname: '/', query: {} };

		if (term) {
			location.query.query = term;
		}

		router.push(location);
	}

	render() {
		const { router } = this.context;
		const location = router.location.query;
		const { query } = location;

		return (
			<form onSubmit={this.onSubmit.bind(this)} onKeyUp={this.onKeyUp.bind(this)} className="search-form">
				<input placeholder="search" ref="search" type="text" className="field" defaultValue={query} />
			</form>
		);
	}

}