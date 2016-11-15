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

	renderError(field) {
		const { errors } = this.state;
		const error = errors[field];
		if (error) {
			return <span className="field-error">{error}</span>
		}
	}

	render() {
		const { list } = this.props;
		return (
			<form onSubmit={this.submitHandler.bind(this)} className="list-form box">
				<h3 className="form-title">list</h3>
				<input ref="title" defaultValue={list ? list.title : ''} placeholder="title" type="text" className="field" />
				{this.renderError('title')}
				<div className="controls">
					<button type="submit" className="btn">{list ? 'update' : 'create'}</button>
				</div>
			</form>
		);
	}

}