import React from 'react';
import ListComponent from '../components/list/index.jsx';

export default class HomePage extends React.Component {

	static contextTypes = {
		bookmarks: React.PropTypes.object,
		router: React.PropTypes.object
	};

	constructor(props, context) {
		super(props, context);
		const { bookmarks } = this.context;

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
		bookmarks.onSearch(this.addBookmarks);
		this.setState({
			isMounted: true
		}, () => {
			if (term) {
				this.search(term);
			} else {
				this.addModels(bookmarks.all());
			}
		});
	}

	componentWillUnmount() {
		const { bookmarks } = this.context;
		bookmarks.removeSearch(this.addBookmarks);
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
			this.search(term);
		} else {
			this.addModels(bookmarks.all());
		}
	}

	search(term) {
		const { bookmarks } = this.context;
		bookmarks.search(term);
	}

	addModels(models) {
		// https://facebook.github.io/react/blog/2015/12/16/ismounted-antipattern.html
		if (this.state.isMounted) {
			this.setState({
				bookmarks: models
			});
		}
	}

	render() {
		const { bookmarks } = this.state;
		return <ListComponent bookmarks={bookmarks} />
	}

}