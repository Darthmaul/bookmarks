import React from 'react';

import { NotFoundComponent } from '../errors.jsx';

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

	remove(event) {
		event.preventDefault();
		const { bookmark } = this.state;
		const { bookmarks, router } = this.context;
		bookmarks.remove(bookmark.id);
		router.push('/');
	}

	render() {
		const { bookmark } = this.state;

		if (bookmark) {

			return (
				<div className="bookmark-detail box">
					<header className="bookmark-detail__header">{bookmark.title}</header>
					<a href={bookmark.url} className="btn">{bookmark.url}</a>
					<a href="#" onClick={this.remove.bind(this)} className="btn">remove</a>
				</div>
			);
		} else {
			return <NotFoundComponent />
		}
	}

}