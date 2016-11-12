import React from 'react';
import ListComponent from '../list/index.jsx';

export default class HomeComponent extends React.Component {

	static contextTypes = {
		bookmarks: React.PropTypes.object,
		router: React.PropTypes.object
	};

	constructor(props, context) {
		super(props, context);
		const { bookmarks } = this.context;

		this.state = {
			bookmarks: bookmarks.all()
		};

		this.addBookmarks = this.addModels.bind(this);
	}

	addModels(models) {
		this.setState({
			bookmarks: models
		});
	}

	componentDidMount() {
		const { bookmarks, router } = this.context;
		const query = router.location.query;
		const term = query.query;
		bookmarks.onSearch(this.addBookmarks);
		if (term) {
			bookmarks.search(term);
		} else {
			this.addModels(bookmarks.all());
		}
	}

	componentWillUnmount() {
		const { bookmarks } = this.context;
		bookmarks.removeSearch(this.addBookmarks);
	}

	componentWillReceiveProps(nextState, nextContext) {
		const { bookmarks } = this.context;
		const { router } = nextContext;
		const query = router.location.query;
		const term = query.query;
		if (term) {
			bookmarks.search(term);
		} else {
			this.addModels(bookmarks.all());
		}
	}

	render() {
		const { bookmarks } = this.state;
		return <ListComponent bookmarks={bookmarks} />
	}

}