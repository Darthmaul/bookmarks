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
		const { title } = this.refs;
		const titleValue = title.value.trim();

		const properties = {
			title: titleValue
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

	renderError() {
		const { errors } = this.state;
		if (_.keys(errors.length)) {
			const error = _.values(errors)[0];
			return <span className="form-error">{error}</span>;
		}
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
						<input ref="title" defaultValue={list ? list.title : ''} placeholder="title" type="text" className="field" />
						{this.renderFieldError('title')}
					</div>
				</div>
				<footer className="box-form__footer clearfix">
					<button type="submit" className="btn pull-right">{list ? 'update' : 'create'}</button>
				</footer>
			</form>
		);
	}

}