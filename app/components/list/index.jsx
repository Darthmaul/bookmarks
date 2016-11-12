import React from 'react';

import BookmarkItemComponent from '../item/item.jsx';

// import styles for this component
require('!style!css!sass!./css/list.scss');

export default class ListComponent extends React.Component {

	render() {
		const { bookmarks } = this.props;

		if (bookmarks.length) {
			return (
				<ul className="bookmark-list">
					{bookmarks.map(bookmark => (
						<BookmarkItemComponent key={bookmark.id} bookmark={bookmark} />
					))}
				</ul>
			);
		} else {
			return <div className="not-found box padding padding-vertical-sm muted">No bookmarks!</div>;
		}
	}

}