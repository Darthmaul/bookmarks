import React from 'react';

import { Link } from 'react-router';

// import styles for this component
require('!style!css!sass!./css/item.scss');

export default class BookmarkItemComponent extends React.Component {

	render() {
		const { bookmark } = this.props;

		console.log(bookmark)

		return (
			<li className="bookmark-item box">
				<header className="bookmark-item__header">
					<Link className="bookmark-item__link" to={"/detail/" + bookmark.id}>{bookmark.title}</Link>
				</header>
				<div className="bookmark-item__options">
					{bookmark.domain}
				</div>
			</li>
		);
	}

}