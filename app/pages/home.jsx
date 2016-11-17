import React from 'react';
import SearchResultsComponent from '../components/search/results/index.jsx';
import Search from '../lib/behaviour/search.js';

export default class HomePage extends React.Component {

	static contextTypes = {
		bookmarks: React.PropTypes.object,
		lists: React.PropTypes.object,
		router: React.PropTypes.object
	};

	constructor(props, context) {
		super(props, context);
		const { bookmarks, lists } = this.context;
		this.search = new Search({ bookmarks, lists });

		this.state = {
			results: [],
			isMounted: false,
		};

		this.addBookmarks = this.addModels.bind(this);
	}

	componentDidMount() {
		const { bookmarks } = this.context;
		const term = this.getTerm();
		this.search.onSearch(this.addBookmarks);
		this.setState({
			isMounted: true
		}, () => {
			if (term) {
				this.performSearch(term);
			} else {
				this.addModels(this.search.all());
			}
		});
	}

	componentWillUnmount() {
		this.search.removeSearch(this.addBookmarks);
		this.setState({
			isMounted: false
		});
	}

	componentWillReceiveProps(nextState, nextContext) {
		const term = this.getTerm(nextContext);;
		if (term) {
			this.performSearch(term);
		} else {
			this.addModels(this.search.all());
		}
	}

	getTerm(context) {
		context = context || this.context;
		const { router } = context;
		const { query: { search } } = router.location;
		return search;
	}

	performSearch(term) {
		this.search.search(term);
	}

	addModels(models) {
		// https://facebook.github.io/react/blog/2015/12/16/ismounted-antipattern.html
		if (this.state.isMounted) {
			models = models.sort((a, b) => new Date(b.date) - new Date(a.date));
			this.setState({
				results: models
			});
		}
	}

	render() {
		const { results } = this.state;
		const term = this.getTerm();
		if (results) {
			return <SearchResultsComponent results={results} />
		} else {
			if (term) {
				
			} else {

			}
		}
	}

}
