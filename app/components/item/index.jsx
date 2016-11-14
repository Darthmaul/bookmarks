import React from 'react';
import classNames from 'classnames';

import { Link } from 'react-router';
import * as _ from '../../lib/tools.js';

// import styles for this component
require('!style!css!sass!./css/item.scss');

export default class BookmarkItemComponent extends React.Component {

	static contextTypes = {
		bookmarks: React.PropTypes.object,
		router: React.PropTypes.object
	};

	constructor(props, context) {
		super(props, context);
		const { shouldShowTags, shouldShowImage, shouldShowText } = props;

		this.state = {
			shouldShowTags: shouldShowTags || false,
			shouldShowImage: shouldShowImage || false,
			shouldShowText: shouldShowText || false
		};
	}

	toggleTags(event) {
		event.preventDefault();
		this.setState({
			shouldShowTags: !this.state.shouldShowTags
		});
	}

	toggleImage(event) {
		event.preventDefault();
		this.setState({
			shouldShowImage: !this.state.shouldShowImage
		});
	}

	toggleText(event) {
		event.preventDefault();
		this.setState({
			shouldShowText: !this.state.shouldShowText
		});
	}

	renderTags() {
		const { bookmark } = this.props;
		const tags = bookmark.tags.map(tag => {
			return <Link to={{ pathName: '/', query: { query: tag } }} key={tag} className="bookmark-item__tag tag">{tag}</Link>;
		});
		return <div className="bookmark-item__tags">{tags}</div>;
	}

	render() {
		let tagsHtml, tagsToggle, imgHtml, imgToggle, textHtml, textToggle, editOptions;
		const { bookmark } = this.props;
		const { shouldShowTags, shouldShowImage, shouldShowText } = this.state;

		if (bookmark.tags && bookmark.tags.length) {
			if (shouldShowTags) {
				tagsHtml = this.renderTags();
			}

			tagsToggle = (
				<li>
					<a href="#" onClick={this.toggleTags.bind(this)}>
						<i className="ion-ios-pricetags" />
					</a>
				</li>
			);
		}

		if (_.validateImageUrl(bookmark.url)) {
			if (shouldShowImage) {
				imgHtml = <div className="bookmark-item__image-wrap"><img className="bookmark-item__image" src={bookmark.url} /></div>;
			}

			imgToggle = (
				<li>
					<a href="#" onClick={this.toggleImage.bind(this)}>
						<i className="ion-image" />
					</a>
				</li>
			);
		}

		if (bookmark.text && bookmark.text.length) {
			if (shouldShowText) {
				textHtml = (
					<div className="bookmark-item__text">
						{bookmark.text}
					</div>
				);
			}

			textToggle = (
				<li>
					<a href="#" onClick={this.toggleText.bind(this)}>
						<i className="ion-document-text" />
					</a>
				</li>
			);
		}

		return (
			<div className="bookmark-item box">
				<header className="bookmark-item__header">
					<Link className="bookmark-item__title" to={bookmark.getDetailUrl()}>{bookmark.title}</Link>
				</header>
				{imgHtml}
				<div className="bookmark-item__options">
					<ul className="bookmark-item__options-toggles">
						{textToggle}
						{imgToggle}
						{tagsToggle}
					</ul>
					<a className="bookmark-item__domain" href={bookmark.url}>{bookmark.domain}</a>
				</div>
				{tagsHtml}
				{textHtml}
			</div>
		);
	}

}