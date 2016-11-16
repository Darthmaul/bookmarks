import React from 'react';
import { Link } from 'react-router';

export default class BookmarkDetailContextMenuComponent extends React.Component {

	render() {
		const { bookmark } = this.props;
		return (
			<ul className="context-menu__nav">
				<li><Link to={bookmark.getEditUrl()}>edit</Link></li>
			</ul>
		);
	}

}