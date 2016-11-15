import React from 'react';
import { hashHistory, Router, Route, IndexRoute } from 'react-router';

import * as _ from './lib/tools';

import AppComponent from './components/app.jsx';
import ContextComponent from './components/context.jsx';

import HomePage from './pages/home.jsx';
import CreatePage from './pages/create.jsx';
import CreateBookmarkPage from './pages/create-bookmark.jsx';
import CreateListPage from './pages/create-list.jsx';
import EditPage from './pages/edit.jsx';
import DetailPage from './pages/detail.jsx';

const routes = (bookmarks, lists) => (
	<ContextComponent bookmarks={bookmarks} lists={lists}>
		<Router history={hashHistory}>
			<Route path="/" component={AppComponent}>
				<IndexRoute component={HomePage} />
				<Route path="/create" component={CreatePage} />
				<Route path="/create-bookmark" component={CreateBookmarkPage} />
				<Route path="/create-list" component={CreateListPage} />
				<Route path="/bookmark/:id/:slug" component={DetailPage} />
				<Route path="/bookmark/:id/:slug/edit" component={EditPage} />
			</Route>
		</Router>
	</ContextComponent>
);

export default routes;