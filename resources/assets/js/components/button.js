import React from 'react';
export default class Square extends React.Component {
	render() {
		return (
			<button className="button" value={this.props.value} onClick={this.props.onClick}>
				{this.props.value}
			</button>
		);
	}
}