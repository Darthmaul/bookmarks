import React from 'react';

import { Link } from 'react-router';
import SearchComponent from '../search/index.jsx';

// import styles for this component
require('!style!css!sass!./css/header.scss');

export default class HeaderComponent extends React.Component {

	render() {
		return (
			<header className="site-header box">
				<ul className="site-header__nav pull-right">
					<li><SearchComponent /></li>
					<li><Link to="/">home</Link></li>
					<li><Link to="/create">create</Link></li>
				</ul>
				
				<h1 className="site-title pull-left">
					<Link to="/">BOOKMARKS</Link>
				</h1>
			</header>
		);
	}

}