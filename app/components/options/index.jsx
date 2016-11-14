import React from 'react';
import { Link } from 'react-router';

// import styles for this component
require('!style!css!sass!./css/options.scss');

export default class OptionsComponent extends React.Component {

	render() {
		const { bookmark } = this.props;
		return (
			<div className="bookmark-options box margin-bottom">
				<Link to={bookmark.getEditUrl()} className="btn">edit</Link>
			</div>
		);
	}

}