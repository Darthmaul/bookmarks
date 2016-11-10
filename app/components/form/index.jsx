import React from 'react';
import * as _ from '../../lib/tools.js';
import * as validators from '../../lib/validators.js';

// import styles for this component
require('!style!css!sass!./css/form.scss');

export default class BookmarkFormComponent extends React.Component {

	static contextTypes = {
		bookmarks: React.PropTypes.object,
		router: React.PropTypes.object
	};

	constructor(props, context) {
		super(props, context);
		
		this.validator = validators.bookmarks;
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

	validate(obj) {
		let validated = true;
		const errors = {};
		for (var prop in obj) {
			if (!obj[prop]) {
				errors[prop] = 'Please enter a ' + prop;
				validated = false;
			} else {
				const validator = this.validator[prop];
				if (validator) {
					const result = validator(obj[prop]);
					if (result) {
						errors[prop] = result;
						validated = false;
					}
				}
			}
		}
		this.setState({ errors });
		return validated;
	}

	submitHandler(event) {
		event.preventDefault();
		const { bookmarks, router } = this.context;
		const { title, url } = this.refs;
		const titleValue = title.value.trim();
		let urlValue = url.value.trim();

		urlValue = urlValue ? _.prependHttp(urlValue) : urlValue;

		const validated = this.validate({
			title: titleValue,
			url: urlValue
		});

		if (validated) {
			const bookmark = bookmarks.create({ title: titleValue, url: urlValue });
			router.push('/detail/' + bookmark.id);
		}
	}

	render() {
		return (
			<form onSubmit={this.submitHandler.bind(this)} className="bookmark-form box">
				<input ref="title" placeholder="title" type="text" className="field" />
				{this.renderError('title')}
				<input ref="url" placeholder="url" type="text" className="field" />
				{this.renderError('url')}
				<div className="controls">
					<button type="submit" className="btn">create</button>
				</div>
			</form>
		)
	}

}