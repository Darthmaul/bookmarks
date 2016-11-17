import React from 'react';

// import styles for this component
require('!style!css!sass!./errors.scss');

export const NotFoundComponent = () => {
	return (
		<div className="error box">
			<header className="box__header">
				<h4>not found!</h4>
			</header>
			<div className="padding">
				<p>looks like we can't find that resource</p>
			</div>
		</div>
	);
};

export const NoResultsComponent = () => {
	return (
		<div className="error box">
			<header className="box__header">
				<h4>no results!</h4>
			</header>
			<div className="padding">
				<p>try ammending your search query</p>
			</div>
		</div>
	);
};