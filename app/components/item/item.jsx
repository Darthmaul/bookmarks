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

	remove(event) {
		event.preventDefault();
		const { bookmark } = this.props;
		const { bookmarks, router } = this.context;
		bookmarks.remove(bookmark.id);
		router.push('/');
	}

	renderTags() {
		const { bookmark } = this.props;
		const tags = bookmark.tags.map(tag => {
			return <Link to={{ pathName: '/', query: { query: tag } }} key={tag} className="bookmark-item__tag">{tag}</Link>;
		});
		return <div className="bookmark-item__tags">{tags}</div>;
	}

	render() {
		let tagsHtml, tagsToggle, imgHtml, imgToggle, textHtml, textToggle, editOptions;
		const { bookmark, shouldShowEditOptions } = this.props;
		const { shouldShowTags, shouldShowImage, shouldShowText } = this.state;

		if (bookmark.tags && bookmark.tags.length) {
			if (shouldShowTags) {
				tagsHtml = this.renderTags();
			}

			tagsToggle = (
				<li>
					<a href="#" onClick={this.toggleTags.bind(this)}>
						<i className={classNames({ "ion-ios-pricetags": true, "icon--active": shouldShowTags })} />
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
						<i className={classNames({ "ion-image": true, "icon--active": shouldShowImage })} />
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
						<i className={classNames({ "ion-document-text": true, "icon--active": shouldShowText })} />
					</a>
				</li>
			);
		}

		if (shouldShowEditOptions) {
			editOptions = (
				<div className="bookmark-item__edit-options padding padding-vertical-sm">
					<Link to={"/bookmark/" + bookmark.id + '/' + bookmark.slug + "/edit"}><i className="ion-edit" /></Link>
					<a href="#" onClick={this.remove.bind(this)}><i className="ion-ios-trash" /></a>
				</div>
			);
		}

		return (
			<li className="bookmark-item box">
				<header className="bookmark-item__header">
					<Link className="bookmark-item__title" to={bookmark.getDetailUrl()}>{bookmark.title}</Link>
				</header>
				{imgHtml}
				{tagsHtml}
				<div className="bookmark-item__options">
					<ul className="bookmark-item__options-toggles">
						<li><a className="bookmark-item__link" href={bookmark.url}><i className="ion-link" /></a></li>
						{textToggle}
						{imgToggle}
						{tagsToggle}
					</ul>
					{bookmark.domain}
				</div>
				{editOptions}
				{textHtml}
			</li>
		);
	}

}