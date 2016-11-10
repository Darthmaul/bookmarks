import React, { Children } from 'react';

export default class ContextComponent extends React.Component {

	static childContextTypes = {
		bookmarks: React.PropTypes.object,
	}

	getChildContext() {
		const { bookmarks } = this.props;
		return { bookmarks: bookmarks };
	}

	render() {
		return this.props.children;
	}

}