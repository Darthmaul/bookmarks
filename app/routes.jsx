import React from 'react';
import { hashHistory, Router, Route, IndexRoute } from 'react-router';
import AppComponent from './components/app.jsx';
import ListComponent from './components/list/index.jsx';
import FormComponent from './components/form/index.jsx';
import ContextComponent from './components/context.jsx';
import DetailComponent from './components/detail/index.jsx';

const routes = (bookmarks) => (
	<ContextComponent bookmarks={bookmarks}>
		<Router history={hashHistory}>
			<Route path="/" component={AppComponent}>
				<IndexRoute component={ListComponent} />
				<Route path="/create" component={FormComponent} />
				<Route path="/detail/:id" component={DetailComponent} />
				<Route path="/search" component={ListComponent} />
			</Route>
		</Router>
	</ContextComponent>
);

export default routes;