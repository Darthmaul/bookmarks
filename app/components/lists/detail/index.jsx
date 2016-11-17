import React from 'react';

import { NotFoundComponent } from '../../errors.jsx';
import ListItemComponent from '../item/index.jsx';
import BookmarkItemComponent from '../../bookmarks/item/index.jsx';

// import styles for this component
require('!style!css!sass!./css/detail.scss');

export default class ListDetailComponent extends React.Component {

	static contextTypes = {
		bookmarks: React.PropTypes.object
	};

	render() {
		let bookmarkList;
		const { list } = this.props;
		const { bookmarks } = this.context;

		if (list.bookmarks.length) {
			const bookmarkModels = bookmarks.get(list.bookmarks);
			const listBookmarks = bookmarkModels.map(bookmark => <li key={bookmark.id} className="list-detail__item"><BookmarkItemComponent bookmark={bookmark} /></li>);
			bookmarkList = <ul className="list-detail__bookmarks">{listBookmarks}</ul>;
		}

		if (list) {
			return (
				<div className="list-detail">
					<ListItemComponent list={list} shouldShowDescription={true} />
					{bookmarkList}
				</div>
			);
		} else {
			return <NotFoundComponent />
		}
	}

}
