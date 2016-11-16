import React from 'react';

import BookmarkItemComponent from '../item/index.jsx';

// import styles for this component
require('!style!css!sass!./css/list.scss');

export default class BookmarkListComponent extends React.Component {

	render() {
		const { bookmarks } = this.props;

		if (bookmarks.length) {
			return (
				<ul className="bookmark-list">
					{bookmarks.map(bookmark => (
						<li key={bookmark.id} className="margin-bottom"><BookmarkItemComponent bookmark={bookmark} /></li>
					))}
				</ul>
			);
		} else {
			return <div className="not-found box padding padding-vertical-sm muted">No bookmarks!</div>;
		}
	}

}