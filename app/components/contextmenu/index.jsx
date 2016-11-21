import React from 'react';

import Tooltip from '../objects/tooltip/index.jsx';

// import styles for this component
require('!style!css!sass!./css/menu.scss');

export default class ContextMenuComponent extends React.Component {

	static contextTypes = {
		getContextMenu: React.PropTypes.func
	};

	constructor(props, context) {
		super(props, context);

		this.state = {
			shouldShowHelpTooltip: false,
		}
	}

	render() {
		const { getContextMenu } = this.context;
		const menu = getContextMenu();

		return (
			<div className="context-menu__wrap">
				<div className="context-menu box">
					<Tooltip title="I built this site for fun. It's just somewhere for me to try things out and to try build something interesting. It uses Local Storage to keep track of your changes between visits.">about</Tooltip>
					<Tooltip title="This menu shows contextual actions you can perform on the page you are viewing">what's this?</Tooltip>
					<div className="context-menu__content">{menu ? menu : ''}</div>
				</div>
			</div>
		)
	}

}
