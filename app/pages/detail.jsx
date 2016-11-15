import React from 'react';
import DetailComponent from '../components/bookmarks/detail/index.jsx';
import { NotFoundComponent } from '../components/errors.jsx';

export default class DetailPage extends React.Component {

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
			return <DetailComponent bookmark={bookmark} />
		} else {
			return <NotFoundComponent />
		}
	}

}