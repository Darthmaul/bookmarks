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
		const { bookmark } = this.props;
		
		this.state = {
			errors: {},
			tags: bookmark ? bookmark.tags : [],
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
		const textValue = text.value.trim();

		const properties = {
			title: titleValue,
			url: urlValue,
			tags: this.state.tags,
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

	removeTag(tag, event) {
		event.preventDefault();
		const { tags } = this.state;
		const index = tags.indexOf(tag.trim());
		if (index >= 0) {
			tags.splice(index, 1);
		}
		this.setState({ tags });
	}

	renderTags() {
		const { tags } = this.state;
		return (
			<ul className="tags-input__tags">
				{tags.map((tag, index) => (
					<li key={index} className="tags-input__tag tag">
						{tag}
						<a onClick={this.removeTag.bind(this, tag)} href="#" className="tag-remove">&times;</a>
					</li>)
				)}
			</ul>
		);
	}

	tagsFieldKeyDownHandler(event) {
		if (event.keyCode == 13 || event.charCode == 13) {
			event.preventDefault();
			// http://stackoverflow.com/questions/24415631/reactjs-syntheticevent-stoppropagation-only-works-with-react-events#comment37772453_24415631
			event.nativeEvent.stopImmediatePropagation();
			const tag = this.refs.tags.value;
			const { tags } = this.state;
			if (tags.indexOf(tag.trim()) == -1) {
				tags.push(tag);
				this.refs.tags.value = '';
				this.setState({ tags });
			}
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
				<input onKeyDown={this.tagsFieldKeyDownHandler.bind(this)} ref="tags" placeholder="tags (enter to add)" type="text" className="field" />
				{this.renderError('tags')}
				{this.renderTags()}
				<div className="controls">
					<button type="submit" className="btn">{bookmark ? 'update' : 'create'}</button>
				</div>
			</form>
		)
	}

}