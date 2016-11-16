import React from 'react';
import BookmarkListComponent from '../components/bookmarks/list/index.jsx';
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
			bookmarks: [],
			isMounted: false,
		};

		this.addBookmarks = this.addModels.bind(this);
	}

	componentDidMount() {
		const { bookmarks, router } = this.context;
		const { query } = router.location;
		const term = query.search;
		this.search.onSearch(this.addBookmarks);
		this.setState({
			isMounted: true
		}, () => {
			if (term) {
				this.performSearch(term);
			} else {
				this.addModels(bookmarks.all());
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
		const { bookmarks } = this.context;
		const { router } = nextContext;
		const { query } = router.location;
		const term = query.search;
		if (term) {
			this.performSearch(term);
		} else {
			this.addModels(bookmarks.all());
		}
	}

	performSearch(term) {
		this.search.search(term);
	}

	addModels(models) {
		// https://facebook.github.io/react/blog/2015/12/16/ismounted-antipattern.html
		if (this.state.isMounted) {
			models = models.sort((a, b) => new Date(b.date) - new Date(a.date));
			models.map(model => console.log(model.date));
			this.setState({
				bookmarks: models
			});
		}
	}

	render() {
		const { bookmarks } = this.state;
		return <BookmarkListComponent bookmarks={bookmarks} />
	}

}