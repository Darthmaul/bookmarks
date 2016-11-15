import React from 'react';
import { render } from 'react-dom';
import { hashHistory, Router, Route, IndexRoute } from 'react-router';
import routes from './routes.jsx';

import './lib/polyfills.js';

import Bookmarks from './lib/collections/bookmarks/index.js';
import Lists from './lib/collections/lists/index.js';

// import generic/site wide styles
require('!style!css!sass!./css/site.scss');

function init() {
	const bookmarks = new Bookmarks();
	const lists = new Lists();

	render(routes(bookmarks, lists), document.getElementById('app'));
}

init();