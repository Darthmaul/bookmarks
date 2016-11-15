import React from 'react';
import { Link } from 'react-router';

// import styles for this component
require('!style!css!sass!./css/create.scss');

export default class CreateComponent extends React.Component {

	render() {
		return (
			<section className="create-choices__container box">
				<div className="create-choices">
					<Link to="/create-bookmark" className="create-choice create-choice--bookmark"><i className="ion-link" /><br/>bookmark</Link>
					<Link to="/create-list" className="create-choice create-choice--list"><i className="ion-ios-list" /><br/>list</Link>
				</div>
			</section>
		);
	}

}