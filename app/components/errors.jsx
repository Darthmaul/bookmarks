import React from 'react';

// import styles for this component
require('!style!css!sass!./errors.scss');

export const NotFoundComponent = () => {
	return (
		<div className="error box">
			<header className="box__header">
				<h3>not found!</h3>
			</header>
			<div className="padding padding-vertical-sm">
				<p>looks like we can't find that resource</p>
			</div>
		</div>
	);
};