import React from 'react';

import BookmarkItemComponent from '../item/item.jsx';

// import styles for this component
require('!style!css!sass!./css/list.scss');

export default class ListComponent extends React.Component {

	static contextTypes = {
		bookmarks: React.PropTypes.object,
		router: React.PropTypes.object
	};

	constructor(props, context) {
		super(props, context);
		const { bookmarks } = this.context;

		this.state = {
			bookmarks: bookmarks.get() || []
		};

		this.addBookmarks = this.addModels.bind(this);

		bookmarks.onAdd(this.addBookmarks);
		bookmarks.onSearch(this.addBookmarks);
	}

	addModels(models) {
		this.setState({
			bookmarks: models
		});
	}

	search() {
		const { bookmarks, router } = this.context;

		const location = router.location.query;
		const { query } = location;
		if (query) {
			bookmarks.search(query);
		} else {
			this.setState({
				bookmarks: bookmarks.get()
			});
		}
	}

	componentDidMount() {
		this.search();
	}

	componentWillReceiveProps() {
		this.search();
	}

	render() {
		const { bookmarks } = this.state;
		
		return (
			<ul className="bookmark-list">
				{bookmarks.map(bookmark => (
					<BookmarkItemComponent key={bookmark.id} bookmark={bookmark} />
				))}
			</ul>
		);
	}

}