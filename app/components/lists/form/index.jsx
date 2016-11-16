import React from 'react';
import * as _ from '../../../lib/tools.js';

// import styles for this component
require('!style!css!sass!./css/form.scss');

export default class ListFormComponent extends React.Component {

	static contextTypes = {
		lists: React.PropTypes.object,
		router: React.PropTypes.object
	};

	constructor(props) {
		super(props);
		const { list } = this.props;

		this.state = {
			errors: false,
			tags: list ? list.tags : []
		};
	}

	submitHandler(event) {
		event.preventDefault();
		const { list } = this.props;
		const { lists, router } = this.context;
		const { title, description } = this.refs;
		const titleValue = title.value.trim();
		const descriptionValue = description.value.trim();

		const properties = {
			title: titleValue,
			description: descriptionValue
		};

		const { errors, validated } = lists.validate(properties);

		if (validated) {
			const saved =  list ? list.update(properties) : lists.create(properties);
			router.push(saved.getDetailUrl());
		} else {
			this.setState({ errors });
		}
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
		const { lists } = this.context;
		return lists.validateField(field, value);
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

	setDescriptionInputHeight() {
		const { description } = this.refs;
		if (description) {
			description.style.height = 'auto';
			description.style.height = description.scrollHeight + 'px';
		}
	}

	descriptionChangeHandler() {
		this.setDescriptionInputHeight();
	}

	render() {
		const { list } = this.props;
		return (
			<form onSubmit={this.submitHandler.bind(this)} className="list-form box-form box">
				<div className="box-form__inner">
					<header className="box-form__header">
						<h2 className="form-title">list</h2>
					</header>
					<div className="field-wrap">
						<input 
							ref="title" 
							defaultValue={list ? list.title : ''} 
							placeholder="title" 
							type="text" 
							className="field"  
							onKeyUp={this.titleKeyUpHandler.bind(this)}
						/>
						{this.renderFieldError('title')}
					</div>
					<div className="field-wrap">
						<textarea 
							ref={ref => {
								this.refs.description = ref;
								this.setDescriptionInputHeight();
							}} 
							onInput={this.descriptionChangeHandler.bind(this)} 
							defaultValue={list ? list.description : ''} 
							placeholder="description" 
							type="text" 
							rows="1" 
							className="field textarea" 
						/>
					</div>
				</div>
				<footer className="box-form__footer clearfix">
					<button type="submit" className="btn pull-right">{list ? 'update' : 'create'}</button>
				</footer>
			</form>
		);
	}

}