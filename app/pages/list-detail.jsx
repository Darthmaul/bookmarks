import React from 'react';
import ListDetailComponent from '../components/lists/detail/index.jsx';
import { NotFoundComponent } from '../components/errors.jsx';

export default class ListDetailPage extends React.Component {

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
			return <ListDetailComponent list={list} />
		} else {
			return <NotFoundComponent />
		}
	}

}