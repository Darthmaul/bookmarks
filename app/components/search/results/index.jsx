import React from 'react';

import { NoResultsComponent } from '../../errors.jsx';
import BookmarkItemComponent from '../../bookmarks/item/index.jsx';
import ListItemComponent from '../../lists/item/index.jsx';
import { isBookmarkModel } from '../../../lib/collections/bookmarks/model.js';
import { isListModel } from '../../../lib/collections/lists/model.js';

// import styles for this component
require('!style!css!sass!./css/list.scss');

export default class SearchResultsComponent extends React.Component {

	render() {
		const { results } = this.props;

		if (results.length) {
			return (
				<ul className="search-results-list">
					{results.map(result => {
						if (isBookmarkModel(result)) {
							return <li key={result.id} className="margin-bottom"><BookmarkItemComponent bookmark={result} /></li>
						} else if (isListModel(result)) {
							return <li key={result.id} className="margin-bottom"><ListItemComponent list={result} /></li>
						}
					})}
				</ul>
			);
		} else {
			return <NoResultsComponent />
		}
	}

}