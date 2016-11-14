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
		let { bookmark } = this.props;
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
			const saved =  bookmark ? bookmark.update(properties) : bookmarks.create(properties);
			router.push(saved.getDetailUrl());
		} else {
			this.setState({ errors });
		}
	}

	render() {
		const { bookmark } = this.props;
		
		return (
			<form onSubmit={this.submitHandler.bind(this)} className="bookmark-form box">
				<input ref="title" defaultValue={bookmark ? bookmark.title : ''} placeholder="title" type="text" className="field" />
				{this.renderError('title')}
				<input ref="url" defaultValue={bookmark ? bookmark.url : ''} placeholder="url" type="text" className="field" autoCapitalize="none" />
				{this.renderError('url')}
				<textarea ref="text" defaultValue={bookmark ? bookmark.text : ''} placeholder="text" type="text" className="field" />
				{this.renderError('text')}
				<input ref="tags" defaultValue={bookmark ? bookmark.tags.join(', ') : ''} placeholder="tags (separate with a comma)" type="text" className="field" />
				{this.renderError('tags')}
				<div className="controls">
					<button type="submit" className="btn">{bookmark ? 'update' : 'create'}</button>
				</div>
			</form>
		)
	}

}