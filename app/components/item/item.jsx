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

	toggleTags(event) {
		event.preventDefault();
		this.setState({
			shouldShowTags: !this.state.shouldShowTags
		});
	}

	renderTags() {
		const { bookmark } = this.props;
		const tags = bookmark.tags.map(tag => {
			return <Link to={{ pathName: '/', query: { query: tag } }} key={tag} className="bookmark-item__tag">{tag}</Link>;
		});
		return <div className="bookmark-item__tags">{tags}</div>;
	}

	render() {
		let tags, tagsToggle;
		const { bookmark } = this.props;
		const { shouldShowTags } = this.state;

		if (bookmark.tags.length) {

			let tagText = 'show tags';

			if (shouldShowTags) {
				tags = this.renderTags();
				tagText = 'hide tags';
			}

			tagsToggle = <a href="#" onClick={this.toggleTags.bind(this)} className="pull-right bookmark-item__tag-toggle"><small>{tagText}</small></a>;
		}

		return (
			<li className="bookmark-item box">
				<header className="bookmark-item__header">
					<Link className="bookmark-item__title" to={"/detail/" + bookmark.id}>{bookmark.title}</Link>
				</header>
				{tags}
				<div className="bookmark-item__options">
					{tagsToggle}
					{bookmark.domain}
				</div>
			</li>
		);
	}

}