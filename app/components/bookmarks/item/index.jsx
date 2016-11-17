import React from 'react';
import showdown from 'showdown';

import { Link } from 'react-router';
import * as _ from '../../../lib/tools.js';

import BookmarkOptionsComponent from '../options/index.jsx';

// import styles for this component
require('!style!css!sass!./css/item.scss');

export default class BookmarkItemComponent extends React.Component {

	static contextTypes = {
		bookmarks: React.PropTypes.object,
		router: React.PropTypes.object
	};

	constructor(props, context) {
		super(props, context);
		const { shouldShowTags, shouldShowImage, shouldShowDescription } = props;

		this.state = {
			shouldShowTags: shouldShowTags || false,
			shouldShowImage: shouldShowImage || false,
			shouldShowDescription: shouldShowDescription || false
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

	toggleDescription(event) {
		event.preventDefault();
		this.setState({
			shouldShowDescription: !this.state.shouldShowDescription
		});
	}

	renderDescription() {
		const { bookmark } = this.props;
		const converter = new showdown.Converter();
		const html = converter.makeHtml(bookmark.description);

		return (
			<div className="bookmark-item__description" dangerouslySetInnerHTML={{__html: html }} />
		);
	}

	renderTags() {
		const { bookmark } = this.props;
		const tags = bookmark.tags.map(tag => {
			return <Link to={{ pathName: '/', query: { search: tag } }} key={tag} className="bookmark-item__tag tag">{tag}</Link>;
		});
		return <div className="bookmark-item__tags">{tags}</div>;
	}

	render() {
		let tagsHtml, tagsToggle, imgHtml, imgToggle, descriptionHtml, descriptionToggle, optionsHtml;
		const { bookmark, shouldShowOptions } = this.props;
		const { shouldShowTags, shouldShowImage, shouldShowDescription } = this.state;

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
				imgHtml = <div className="bookmark-item__image-wrap"><a href={bookmark.url}><img className="bookmark-item__image" src={bookmark.url} /></a></div>;
			}

			imgToggle = (
				<li>
					<a href="#" onClick={this.toggleImage.bind(this)}>
						<i className="ion-image" />
					</a>
				</li>
			);
		}

		if (bookmark.description && bookmark.description.length) {
			if (shouldShowDescription) {
				descriptionHtml = this.renderDescription();
			}

			descriptionToggle = (
				<li>
					<a href="#" onClick={this.toggleDescription.bind(this)}>
						<i className="ion-document-text" />
					</a>
				</li>
			);
		}

		if (shouldShowOptions) {
			optionsHtml = <BookmarkOptionsComponent bookmark={bookmark} />;
		}

		return (
			<div className="bookmark-item box">
				<header className="bookmark-item__header">
					<Link className="bookmark-item__title" to={bookmark.getDetailUrl()}>{bookmark.title}</Link>
				</header>
				{imgHtml}
				<footer className="bookmark-item__footer">
					<ul className="bookmark-item__footer-toggles">
						{imgToggle}
						{tagsToggle}
						{descriptionToggle}
					</ul>
					<a className="bookmark-item__domain" href={bookmark.url}>{bookmark.domain}</a>
				</footer>
				{tagsHtml}
				{descriptionHtml}
				{optionsHtml}
			</div>
		);
	}

}