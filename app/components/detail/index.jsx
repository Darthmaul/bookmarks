import React from 'react';

import { NotFoundComponent } from '../errors.jsx';
import BookmarkItemComponent from '../item/index.jsx';
import BookmarkOptionsComponent from '../options/index.jsx';

// import styles for this component
require('!style!css!sass!./css/detail.scss');

export default class DetailComponent extends React.Component {

	render() {
		const { bookmark } = this.props;

		if (bookmark) {
			return (
				<div className="bookmark-detail">
					<BookmarkOptionsComponent bookmark={bookmark} />
					<BookmarkItemComponent shouldShowTags={true} shouldShowImage={true} shouldShowText={true} bookmark={bookmark} />
				</div>
			);
		} else {
			return <NotFoundComponent />
		}
	}

}
