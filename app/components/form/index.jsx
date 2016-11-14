import React from 'react';
import * as _ from '../../lib/tools.js';

// import styles for this component
require('!style!css!sass!./css/form.scss');

export default class BookmarkFormComponent extends React.Component {

	static contextTypes = {
		bookmarks: React.PropTypes.object,
		router: React.PropTypes.object
	};

	constructor(props, context) {
		super(props, context);
		
		this.state = {
			errors: {}
		}
	}

	renderError(field) {
		const { errors } = this.state;
		const error = errors[field];
		if (error) {
			return <span className="field-error">{error}</span>
		}
	}

	submitHandler(event) {
		event.preventDefault();
		const { bookmarks, router } = this.context;
		const { title, url, tags, text } = this.refs;
		const titleValue = title.value.trim();
		const urlValue = url.value.trim();
		const tagsValue = tags.value.trim();
		const textValue = text.value.trim();

		const properties = {
			title: titleValue,
			url: urlValue,
			tags: tagsValue,
			text: textValue
		};

		const { errors, validated } = bookmarks.validate(properties);

		if (validated) {
			const bookmark = bookmarks.create(properties);
			router.push(bookmark.getDetailUrl());
		} else {
			this.setState({ errors });
		}
	}

	render() {
		return (
			<form onSubmit={this.submitHandler.bind(this)} className="bookmark-form box">
				<input ref="title" placeholder="title" type="text" className="field" />
				{this.renderError('title')}
				<input ref="url" placeholder="url" type="text" className="field" autoCapitalize="none" />
				{this.renderError('url')}
				<textarea ref="text" placeholder="text" type="text" className="field" />
				{this.renderError('text')}
				<input ref="tags" placeholder="tags (separate with a comma)" type="text" className="field" />
				{this.renderError('tags')}
				<div className="controls">
					<button type="submit" className="btn">create</button>
				</div>
			</form>
		)
	}

}