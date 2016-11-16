import React from 'react';

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

	helpClickHandler(event) {
		event.preventDefault();
		this.setState({
			shouldShowHelpTooltip: !this.state.shouldShowHelpTooltip
		});
	}

	render() {
		let tooltipClass = "context-menu__help tooltip";
		const { getContextMenu } = this.context;
		const { shouldShowHelpTooltip } = this.state;

		const menu = getContextMenu();

		if (shouldShowHelpTooltip) {
			tooltipClass += ' tooltip--active';
		}

		return (
			<div className="context-menu__wrap">
				<div className="context-menu box">
					<a 
						href="#" 
						onClick={this.helpClickHandler.bind(this)} 
						className={tooltipClass} 
						title="This menu shows contextual actions you can perform on the page you are viewing"
					>what's this?</a>
					<div className="context-menu__content">{menu ? menu : ''}</div>
				</div>
			</div>
		)
	}

}