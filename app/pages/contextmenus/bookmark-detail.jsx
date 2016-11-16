import React from 'react';
import { Link } from 'react-router';

export default class BookmarkDetailContextMenuComponent extends React.Component {

	static contextTypes = {
		bookmarks: React.PropTypes.object,
		router: React.PropTypes.object
	};

	remove(event) {
		event.preventDefault();
		const { bookmark } = this.props;
		const { bookmarks, router } = this.context;
		bookmarks.remove(bookmark.id);
		router.push('/');
	}

	render() {
		const { bookmark } = this.props;
		return (
			<ul className="context-menu__nav">
				<li><Link to={bookmark.getEditUrl()}>edit</Link></li>
				<li><a href="#" onClick={this.remove.bind(this)}>remove</a></li>
			</ul>
		);
	}

}