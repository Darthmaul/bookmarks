import React from 'react';
import { hashHistory, Router, Route, IndexRoute } from 'react-router';

import * as _ from './lib/tools';

import AppComponent from './components/app.jsx';
import ContextComponent from './components/context.jsx';

import HomePage from './pages/home.jsx';
import CreatePage from './pages/create.jsx';
import CreateBookmarkPage from './pages/create-bookmark.jsx';
import CreateListPage from './pages/create-list.jsx';
import BookmarkDetailPage from './pages/bookmark-detail.jsx';
import BookmarkEditPage from './pages/bookmark-edit.jsx';
import ListDetailPage from './pages/list-detail.jsx';
import ListEditPage from './pages/list-edit.jsx';

const routes = (bookmarks, lists) => (
	<ContextComponent bookmarks={bookmarks} lists={lists}>
		<Router history={hashHistory}>
			<Route path="/" component={AppComponent}>
				<IndexRoute component={HomePage} />
				
				<Route path="/create" component={CreatePage} />
				<Route path="/create-bookmark" component={CreateBookmarkPage} />
				<Route path="/create-list" component={CreateListPage} />
				
				<Route path="/bookmark/:id/:slug" component={BookmarkDetailPage} />
				<Route path="/bookmark/:id/:slug/edit" component={BookmarkEditPage} />
				
				<Route path="/list/:id/:slug" component={ListDetailPage} />
				<Route path="/list/:id/:slug/edit" component={ListEditPage} />
			</Route>
		</Router>
	</ContextComponent>
);

export default routes;