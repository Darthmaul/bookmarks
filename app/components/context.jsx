import React, { Children } from 'react';

export default class ContextComponent extends React.Component {

	static childContextTypes = {
		bookmarks: React.PropTypes.object,
		lists: React.PropTypes.object,
	}

	getChildContext() {
		const { bookmarks, lists } = this.props;
		return { bookmarks, lists };
	}

	render() {
		return this.props.children;
	}

}