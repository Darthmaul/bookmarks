import React from 'react';
import ListFormComponent from '../components/lists/form/index.jsx';
import { NotFoundComponent } from '../components/errors.jsx';

export default class ListEditPage extends React.Component {

	static contextTypes = {
		lists: React.PropTypes.object,
		router: React.PropTypes.object
	};

	constructor(props, context) {
		super(props, context);
		this.state = { list: false };
	}

	componentDidMount() {
		const { lists, router } = this.context;
		const { params: { id } } = this.props;
		const list = lists.get(id);

		this.setState({ list });
	}

	render() {
		const { list } = this.state;
		if (list) {
			return <ListFormComponent list={list} />
		} else {
			return <NotFoundComponent />
		}
	}

}