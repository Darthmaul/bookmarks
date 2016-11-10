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
					<li className="site-header__create-link"><Link to="/create">&#43;</Link></li>
					<li><SearchComponent /></li>
				</ul>
				<h1 className="site-title pull-left">
					<Link to="/">BOOKMARKS</Link>
				</h1>
			</header>
		);
	}

}