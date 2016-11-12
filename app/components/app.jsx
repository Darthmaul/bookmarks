import React from 'react';

import HeaderComponent from './header/index.jsx';

// import styles for this component
require('!style!css!sass!./app.scss');

export default class AppComponent extends React.Component {

	render() {
		const { children } = this.props;
		return (
			<div className="app">
				<HeaderComponent />
				<div className="content">
					{children}
				</div>
			</div>
		);
	}

}