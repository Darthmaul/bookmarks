import React from 'react';
import onClickOutside from 'react-onclickoutside';

// import styles for this component
require('!style!css!sass!./css/tooltip.scss');

class Tooltip extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			shouldShowTooltip: false,
		}
	}

	tooltipClickHandler(event) {
		event.preventDefault();
		this.setState({
			shouldShowTooltip: true
		});
	}

	handleClickOutside(event) {
		if (this.state.shouldShowTooltip) {
			this.setState({
				shouldShowTooltip: false
			});
		}
	}

	render() {
		let tooltipClass = "context-menu__help tooltip";
		const { children, title, tooltipClassName } = this.props;
		const { shouldShowTooltip } = this.state;

		if (shouldShowTooltip) {
			tooltipClass += ' tooltip--active';
		}

		if (tooltipClassName) {
			tooltipClass += ' ';
			tooltipClass += tooltipClassName;
		}

		return (
			<a 
				href="#" 
				onClick={this.tooltipClickHandler.bind(this)} 
				className={tooltipClass} 
				title={title}
			>{children}</a>
		)
	}

}

export default onClickOutside(Tooltip);