import React from 'react';
import showdown from 'showdown';

import { Link } from 'react-router';

// import styles for this component
require('!style!css!sass!./css/item.scss');

export default class ListItemComponent extends React.Component {

	renderDescription() {
		const { list } = this.props;
		const converter = new showdown.Converter();
		const html = converter.makeHtml(list.description);

		return (
			<div className="list-item__description" dangerouslySetInnerHTML={{__html: html }} />
		);
	}

	render() {
		let descriptionHtml;
		const { list, shouldShowDescription } = this.props;

		if (shouldShowDescription && list.description.length) {
			descriptionHtml = this.renderDescription();
		}

		const headerTitle = list.bookmarks.length == 1 ? '1 bookmark' : list.bookmarks.length + ' bookmarks';

		return (
			<div className="list-item box">
				<div className="list-item__details">
					<span className="list-item__bookmark-count">{headerTitle}</span>
				</div>
				<header className="list-item__header"><Link className="list-item__title" to={list.getDetailUrl()}>{list.title}</Link></header>
				{descriptionHtml}
			</div>
		);
	}

}
