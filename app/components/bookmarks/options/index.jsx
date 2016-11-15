import React from 'react';
import { Link } from 'react-router';

// import styles for this component
require('!style!css!sass!./css/options.scss');

export default class OptionsComponent extends React.Component {

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
			<div className="bookmark-options box margin-bottom-sm">
				<a className="btn" href={bookmark.url}>visit</a>
				<Link to={bookmark.getEditUrl()} className="btn">edit</Link>
				<a className="btn" href="#" onClick={this.remove.bind(this)}>delete</a>
			</div>
		);
	}

}