import React from 'react';
import { Link } from 'react-router';

import { NotFoundComponent } from '../errors.jsx';
import BookmarkItemComponent from '../item/item.jsx';

// import styles for this component
require('!style!css!sass!./css/detail.scss');

export default class DetailComponent extends React.Component {

	static contextTypes = {
		bookmarks: React.PropTypes.object,
		router: React.PropTypes.object
	};

	constructor(props, context) {
		super(props, context);
		const { bookmarks, router } = context;
		const { params: { id } } = props;
		const bookmark = bookmarks.get(id);

		this.state = { bookmark };
	}

	render() {
		const { bookmark } = this.state;

		if (bookmark) {
			return (
				<div className="bookmark-detail">
					<BookmarkItemComponent shouldShowTags={true} shouldShowImage={true} shouldShowText={true} shouldShowEditOptions={true} bookmark={bookmark} />
				</div>
			);
		} else {
			return <NotFoundComponent />
		}
	}

}