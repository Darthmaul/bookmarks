import React from 'react';
import * as _ from '../../../lib/tools.js';

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

	submitHandler(event) {
		event.preventDefault();
		const { bookmark } = this.props;
		const { bookmarks, router } = this.context;
		const { title, url, tags, description } = this.refs;
		const titleValue = title.value.trim();
		const urlValue = url.value.trim();
		const descriptionValue = description.value.trim();

		const properties = {
			title: titleValue,
			url: urlValue,
			tags: this.state.tags,
			description: descriptionValue
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
			const input = this.refs.tags;
			const tag = input.value;
			if (tag.trim()) {
				const { tags } = this.state;
				if (tags.indexOf(tag.trim()) == -1) {
					tags.push(tag);
					this.setState({ tags }, () => {
						// setting input value to empty string doesn't show placeholder in webkit for some reason. bluring and focusing fixes it. 
						input.value = '';
						input.blur();
						input.focus();
					});
					
				}
			}
		}
	}

	setDescriptionInputHeight() {
		const { description } = this.refs;
		if (description) {
			description.style.height = 'auto';
			description.style.height = (description.scrollHeight + 20) + 'px';
		}
	}

	descriptionChangeHandler() {
		this.setDescriptionInputHeight();
	}

	getFieldError(field) {
		const { errors } = this.state;
		const error = errors[field];
		return error ? error : false;
	}

	renderFieldError(field) {
		const error = this.getFieldError(field);
		if (error) {
			return <span className="field-error">{error}</span>
		}
	}

	validateField(field, value) {
		const { bookmarks } = this.context;
		return bookmarks.validateField(field, value);
	}

	titleKeyUpHandler(event) {
		const errorState = this.getFieldError('title');
		if (errorState) {
			const { title } = this.refs;
			const error = this.validateField('title', title.value.trim());
			const { errors } = this.state;
			errors.title = error;
			this.setState({ errors });
		}
	}

	urlKeyUpHandler(event) {
		if (event.keyCode != 9 && event.charCode != 9 && event.keyCode != 13 && event.charCode != 13) {
			const errorState = this.getFieldError('url');
			if (errorState) {
				const { url } = this.refs;
				const value = url.value.trim();
				const { errors } = this.state;
				if (value) {
					const error = this.validateField('url', value);
					errors.url = error;
				} else {
					delete errors['url'];
				}
				this.setState({ errors });
			}
		}
	}

	render() {
		const { bookmark } = this.props;
		
		return (
			<form onSubmit={this.submitHandler.bind(this)} className="bookmark-form box-form box">
				<div className="box-form__inner">
					<header className="box-form__header">
						<h2 className="form-title">bookmark</h2>
					</header>
					<div className="field-wrap">
						<input 
							ref="title"
							defaultValue={bookmark ? bookmark.title : ''} 
							placeholder="title" 
							type="text" 
							className="field" 
							onKeyUp={this.titleKeyUpHandler.bind(this)}
						/>
						{this.renderFieldError('title')}
					</div>
					<div className="field-wrap">
						<input 
							ref="url"
							defaultValue={bookmark ? bookmark.url : ''} 
							placeholder="url" 
							type="text" 
							className="field" 
							autoCapitalize="none" 
							onKeyUp={this.urlKeyUpHandler.bind(this)}
						/>
						{this.renderFieldError('url')}
					</div>
					<div className="field-wrap">
						<textarea 
							ref={ref => {
								this.refs.description = ref;
								this.setDescriptionInputHeight();
							}} 
							onInput={this.descriptionChangeHandler.bind(this)} 
							defaultValue={bookmark ? bookmark.description : ''} 
							placeholder="description" 
							type="text" 
							className="field textarea" 
						/>
					</div>
					<div className="field-wrap">
						<input 
							onKeyDown={this.tagsFieldKeyDownHandler.bind(this)} 
							ref="tags" 
							placeholder="tags" 
							type="text" 
							className="field field--tags" 
						/>
						{this.renderTags()}
					</div>
				</div>
				<footer className="box-form__footer clearfix">
					<button type="submit" className="btn pull-right">{bookmark ? 'update' : 'create'}</button>
				</footer>
			</form>
		)
	}

}
