import React, { Children } from 'react';

export default class ContextComponent extends React.Component {

	static childContextTypes = {
		bookmarks: React.PropTypes.object,
		lists: React.PropTypes.object,
		setContextMenu: React.PropTypes.func,
		getContextMenu: React.PropTypes.func
	}

	constructor(props, context) {
		super(props, context);

		this.state = {
			menu: false
		};
	}

	getChildContext() {
		const { bookmarks, lists } = this.props;
		const { menu } = this.state;
		const { setContextMenu, getContextMenu } = this;
		return { bookmarks, lists, setContextMenu: setContextMenu.bind(this), getContextMenu: getContextMenu.bind(this) };
	}

	setContextMenu(menu) {
		this.setState({ menu });
	}

	getContextMenu() {
		return this.state.menu;
	}

	render() {
		return this.props.children;
	}

}