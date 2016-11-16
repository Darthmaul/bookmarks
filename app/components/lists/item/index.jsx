import React from 'react';

// import styles for this component
require('!style!css!sass!./css/item.scss');

export default class ListItemComponent extends React.Component {

	render() {
		const { list } = this.props;

		return (
			<div className="box">{list.title}</div>
		);
	}

}
