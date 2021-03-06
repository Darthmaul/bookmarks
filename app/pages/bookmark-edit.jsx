import React from 'react';
import BookmarkFormComponent from '../components/bookmarks/form/index.jsx';
import { NotFoundComponent } from '../components/errors.jsx';

export default class BookmarkEditPage extends React.Component {

	static contextTypes = {
		bookmarks: React.PropTypes.object,
		router: React.PropTypes.object
	};

	constructor(props, context) {
		super(props, context);
		this.state = { bookmark: false };
	}

	componentDidMount() {
		const { bookmarks, router } = this.context;
		const { params: { id } } = this.props;
		const bookmark = bookmarks.get(id);

		this.setState({ bookmark });
	}

	render() {
		const { bookmark } = this.state;
		if (bookmark) {
			return <BookmarkFormComponent bookmark={bookmark} />
		} else {
			return <NotFoundComponent />
		}
	}

}