import React from 'react';
import BookmarkDetailComponent from '../components/bookmarks/detail/index.jsx';
import BookmarkDetailContextMenuComponent from './contextmenus/bookmark-detail.jsx';
import { NotFoundComponent } from '../components/errors.jsx';

export default class BookmarkDetailPage extends React.Component {

	static contextTypes = {
		bookmarks: React.PropTypes.object,
		router: React.PropTypes.object,
		setContextMenu: React.PropTypes.func,
	};

	constructor(props, context) {
		super(props, context);
		this.state = { bookmark: false };
	}

	componentDidMount() {
		const { bookmarks, router, setContextMenu } = this.context;
		const { params: { id } } = this.props;
		const bookmark = bookmarks.get(id);

		this.setState({ bookmark });
		setContextMenu(<BookmarkDetailContextMenuComponent bookmark={bookmark} />);
	}

	componentWillUnmount() {
		const { setContextMenu } = this.context;
		setContextMenu(false);
	}

	render() {
		const { bookmark } = this.state;
		if (bookmark) {
			return <BookmarkDetailComponent bookmark={bookmark} />
		} else {
			return <NotFoundComponent />
		}
	}

}