import React from 'react';

import { Link } from 'react-router';

// import styles for this component
require('!style!css!sass!./css/item.scss');

export default class BookmarkItemComponent extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			shouldShowTags: false
		};
	}

	showTags() {
		this.setState({
			shouldShowTags: true
		});
	}

	hideTags() {
		this.setState({
			shouldShowTags: false
		});
	}

	toggleTags() {
		this.setState({
			shouldShowTags: !this.state.shouldShowTags
		});
	}

	renderTags() {
		
	}

	render() {
		const { bookmark } = this.props;
		const { shouldShowTags } = this.state;

		let tags;

		if (shouldShowTags) tags = this.renderTags();

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