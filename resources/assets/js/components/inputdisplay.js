import React from 'react';

export default class InputDisplay extends React.Component {
	render() {
		return (
			<div className="display">
				<div>
				{this.props.backlog}
				</div>
				<input 
				type="text" 
				value={this.props.current}
				onKeyPress={this.props.onKeyPress} />
			</div>
		);
	}
}