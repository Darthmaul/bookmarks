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
			bookmarks: bookmarks.all(),
			isMounted: false,
		};

		this.addBookmarks = this.addModels.bind(this);
		bookmarks.onSearch(this.addBookmarks);
	}

	componentDidMount() {
		const { bookmarks, router } = this.context;
		const query = router.location.query;
		const term = query.query;
		const tags = query.tags;
		this.setState({
			isMounted: true
		});
		this.search(term);
	}

	componentWillUnmount() {
		const { bookmarks } = this.context;
		bookmarks.removeSearch(this.addBookmarks);
		this.setState({
			isMounted: false
		});
	}

	componentWillReceiveProps(nextState, nextContext) {
		const { router } = nextContext;
		const query = router.location.query;
		const term = query.query;
		this.search(term);
	}

	search(term) {
		const { bookmarks } = this.context;
		if (term) {
			bookmarks.search(term);
		} else {
			this.addModels(bookmarks.all());
		}
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