import React from 'react';
import DetailComponent from '../components/detail/index.jsx';
import { NotFoundComponent } from '../components/errors.jsx';

export default class DetailPage extends React.Component {

	static contextTypes = {
		bookmarks: React.PropTypes.object,
		router: React.PropTypes.object
	};

	constructor(props, context) {
		super(props, context);
		const { bookmarks, router } = context;
		const { params: { id } } = props;
		const bookmark = bookmarks.get(id);

		this.state = { bookmark };
	}

	render() {
		const { bookmark } = this.state;
		if (bookmark) {
			return <DetailComponent bookmark={bookmark} />
		} else {
			return <NotFoundComponent />
		}
	}

}