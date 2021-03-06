import React from 'react';
import showdown from 'showdown';
import classnames from 'classnames';

import { Link } from 'react-router';
import * as _ from '../../../lib/tools.js';

// import styles for this component
require('!style!css!sass!./css/item.scss');

export default class BookmarkItemComponent extends React.Component {

	static contextTypes = {
		bookmarks: React.PropTypes.object,
		router: React.PropTypes.object
	};

	constructor(props, context) {
		super(props, context);
		const { shouldShowTags, shouldShowOptions, shouldShowImage, shouldShowDescription } = props;

		this.state = {
			shouldShowTags: shouldShowTags || false,
            		shouldShowOptions: shouldShowOptions || false,
			shouldShowImage: shouldShowImage || false,
			shouldShowDescription: shouldShowDescription || false
		};
	}

	hasTags() {
    		const { bookmark } = this.props;
    		return bookmark.tags && bookmark.tags.length;
    	}

    	isImageUrl() {
		const { bookmark } = this.props;
		return bookmark.url && _.validateImageUrl(bookmark.url);
	}

	hasDescription() {
		const { bookmark } = this.props;
		return bookmark.description && bookmark.description.length;
	}

	toggleOptions(event) {
		event.preventDefault();
		this.setState({
			shouldShowOptions: !this.state.shouldShowOptions
		});
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

	renderOptions() {
		const { bookmark } = this.props;
		let tagsToggle, imgToggle, descriptionToggle;
		const { shouldShowTags, shouldShowImage, shouldShowDescription } = this.state;

		if (this.hasTags()) {
			tagsToggle = (
				<li key={Math.random()}>
					<a href="#" onClick={this.toggleTags.bind(this)}>
						<i className="ion-ios-pricetags" />
					</a>
				</li>
			);
		}

		if (this.isImageUrl()) {
			imgToggle = (
				<li key={Math.random()}>
					<a href="#" onClick={this.toggleImage.bind(this)}>
						<i className="ion-image" />
					</a>
				</li>
			);
		}

		if (this.hasDescription()) {
			descriptionToggle = (
				<li key={Math.random()}>
					<a href="#" onClick={this.toggleDescription.bind(this)}>
						<i className="ion-document-text" />
					</a>
				</li>
			);
		}

		return [
			imgToggle,
			tagsToggle,
			descriptionToggle
		];
	}

	shouldShowToggles() {
		return this.hasTags() || this.isImageUrl() || this.hasDescription();
	}

	render() {
		let tagsHtml, imgHtml, descriptionHtml, optionsToggle, toggles;
		const { bookmark } = this.props;
		const { shouldShowTags, shouldShowImage, shouldShowDescription, shouldShowOptions } = this.state;

		if (shouldShowTags && this.hasTags()) {
			tagsHtml = this.renderTags();
		}

		if (shouldShowImage && this.isImageUrl()) {
			imgHtml = <div className="bookmark-item__image-wrap"><a href={bookmark.url}><img className="bookmark-item__image" src={bookmark.url} /></a></div>;
		}

		if (shouldShowDescription && this.hasDescription()) {
			descriptionHtml = this.renderDescription();
		}
		
		if (this.shouldShowToggles()) {
			let optionsToggleClass = "bookmark-item__options-toggle ion-android-more-horizontal";

			if (shouldShowOptions) {
				optionsToggleClass += ' bookmark-item__options-toggle--open';
			}

            		toggles = (
				<ul className="bookmark-item__toggles">
    					{this.renderOptions()}
				</ul>
            		);
		}

		return (
			<div className="bookmark-item box">
				<header className="bookmark-item__header">
					<Link className="bookmark-item__title" to={bookmark.getDetailUrl()}>{bookmark.title}</Link>
				</header>
				{imgHtml}
				<footer className="bookmark-item__footer">
                    			{toggles}
					<a className="bookmark-item__domain" href={bookmark.url}>{bookmark.domain}</a>
				</footer>
				{tagsHtml}
				{descriptionHtml}
			</div>
		);
	}

}
