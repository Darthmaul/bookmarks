import React from 'react';
import showdown from 'showdown';

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

		if (bookmark.tags && bookmark.tags.length) {
			tagsToggle = (
				<li>
					<a href="#" onClick={this.toggleTags.bind(this)}>
						<i className="ion-ios-pricetags" />
					</a>
				</li>
			);
		}

		if (_.validateImageUrl(bookmark.url)) {
			imgToggle = (
				<li>
					<a href="#" onClick={this.toggleImage.bind(this)}>
						<i className="ion-image" />
					</a>
				</li>
			);
		}

		if (bookmark.description && bookmark.description.length) {
			descriptionToggle = (
				<li>
					<a href="#" onClick={this.toggleDescription.bind(this)}>
						<i className="ion-document-text" />
					</a>
				</li>
			);
		}

		return (
			<div className="bookmark-item__options clearfix">
					<ul className="bookmark-item__toggles">
						{imgToggle}
						{tagsToggle}
						{descriptionToggle}
					</ul>
			</div>
		);

    }

	render() {
		let tagsHtml, imgHtml, descriptionHtml, optionsHtml;
		const { bookmark } = this.props;
		const { shouldShowTags, shouldShowImage, shouldShowDescription, shouldShowOptions } = this.state;

		if (shouldShowTags) {
			tagsHtml = this.renderTags();
		}

		if (shouldShowImage) {
			imgHtml = <div className="bookmark-item__image-wrap"><a href={bookmark.url}><img className="bookmark-item__image" src={bookmark.url} /></a></div>;
		}

		if (shouldShowDescription) {
			descriptionHtml = this.renderDescription();
		}

		if (shouldShowOptions) {
			optionsHtml = this.renderOptions();
		}

		return (
			<div className="bookmark-item box">
				<header className="bookmark-item__header">
					<Link className="bookmark-item__title" to={bookmark.getDetailUrl()}>{bookmark.title}</Link>
				</header>
				{imgHtml}
				<footer className="bookmark-item__footer">
					<ul className="bookmark-item__toggles">
						<li>
							<a className="bookmark-item__options-toggle" href="#" onClick={this.toggleOptions.bind(this)}>
								<i className="ion-android-more-horizontal" />
							</a>
						</li>
					</ul>
					<a className="bookmark-item__domain" href={bookmark.url}>{bookmark.domain}</a>
				</footer>
				{optionsHtml}
				{tagsHtml}
				{descriptionHtml}
			</div>
		);
	}

}
