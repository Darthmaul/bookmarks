import React from 'react';
import { hashHistory, Router, Route, IndexRoute } from 'react-router';

import * as _ from './lib/tools';

import AppComponent from './components/app.jsx';
import ContextComponent from './components/context.jsx';

import HomePage from './pages/home.jsx';
import CreatePage from './pages/create.jsx';
import EditPage from './pages/create.jsx';
import DetailPage from './pages/detail.jsx';

const routes = bookmarks => (
	<ContextComponent bookmarks={bookmarks}>
		<Router history={hashHistory}>
			<Route path="/" component={AppComponent}>
				<IndexRoute component={HomePage} />
				<Route path="/create" component={CreatePage} />
				<Route path="/bookmark/:id/:slug" component={DetailPage} />
				<Route path="/bookmark/:id/:slug/edit" component={EditPage} />
			</Route>
		</Router>
	</ContextComponent>
);

export default routes;