import React from 'react';
import { Link } from 'react-router';

export default class ListDetailContextMenuComponent extends React.Component {

	static contextTypes = {
		lists: React.PropTypes.object,
		router: React.PropTypes.object
	};

	remove(event) {
		event.preventDefault();
		const { list } = this.props;
		const { lists, router } = this.context;
		lists.remove(list.id);
		router.push('/');
	}

	render() {
		const { list } = this.props;
		return (
			<ul className="context-menu__nav">
				<li><Link to={list.getEditUrl()}>edit</Link></li>
				<li><a href="#" onClick={this.remove.bind(this)}>remove</a></li>
			</ul>
		);
	}

}