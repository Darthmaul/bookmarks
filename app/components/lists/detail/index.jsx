import React from 'react';

import { NotFoundComponent } from '../../errors.jsx';
import ListItemComponent from '../item/index.jsx';

// import styles for this component
require('!style!css!sass!./css/detail.scss');

export default class ListDetailComponent extends React.Component {

	render() {
		const { list } = this.props;
		if (list) {
			return (
				<div className="list-detail">
					<ListItemComponent list={list} shouldShowDescription={true} />
				</div>
			);
		} else {
			return <NotFoundComponent />
		}
	}

}
