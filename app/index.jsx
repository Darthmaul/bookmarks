import React from 'react';
import { render } from 'react-dom';
import { hashHistory, Router, Route, IndexRoute } from 'react-router';
import routes from './routes.jsx';

import './lib/polyfills.js';

import BookmarksCollection from './lib/collections/bookmarks.js';

// import generic/site wide styles
require('!style!css!sass!./css/site.scss');

function init() {
	const bookmarks = new BookmarksCollection();

	render(routes(bookmarks), document.getElementById('app'));
}

init();