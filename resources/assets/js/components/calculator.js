import React from 'react';
import Button from './button';
import InputDisplay from './InputDisplay';
import History from './History';
import Expression from './../expression';

/**
 * The idea is quite simple. All insertions and computation
 * are handled by the Expression class, that keeps tracks of 
 * the current input and the calculation backlog 
 */
export default class Calculator extends React.Component {

	constructor(props) {
		super(props);
		this.expression = new Expression();
		this.logged = this.props.logged;
		this.state = {current: this.expression.getCurrent(), backlog: '', backlogs: []};
	}
	

	/**
	 * handle char insertion and button click
	 * @param {string} backlog the new backlo
	 */
	handleInputEvent(event) {
		const char = event.type === 'click' ? event.target.value : event.key;		
		const data = this.expression.handleInput(char, (backlog) => {this.addBacklog(backlog)});
		this.setState({current: data.current, backlog: data.backlog});				
	}

	handleHistoryClick(backlog) {	
		this.expression.clear();	
		this.expression.setBacklog(backlog);		
		const data = this.expression.handleInput('=');				
		this.setState({current: data.current, backlog: backlog});
	}


	/**
	 * callback to use when a new expression must be added to 
	 * the backlogs list
	 * @param {string} backlog the new backlo
	 */
	addBacklog(backlog) {
		let backlogs = this.state.backlogs;		
		backlogs.push({name: '', expression: backlog});		
		this.setState({backlogs: backlogs});
	}


	/**
	 * fetch data if user is logged
	 */
	componentDidMount() {
		if (this.logged == 1) {
			fetch('/backlogs', {credentials: 'include'})
			.then((response) => {
				return response.json();
			}).then((backlogs) => {
				const filtered = backlogs.map((backlog) => { 
					return {name: backlog.name, expression: backlog.expression};
				});			
				this.setState({backlogs: filtered});
			})
		}
	}


	render() {
		const backlogs = this.state.backlogs;
		const backlog = this.state.backlog;
		const current = this.state.current;
		return (			
		<div className="calculator">
			<InputDisplay current={current}
						  backlog={backlog}
						  onKeyPress={(e) => this.handleInputEvent(e)} />
			<div className='calculator-row'>
				<Button value='7' onClick={(e) => this.handleInputEvent(e)} />
				<Button value='8' onClick={(e) => this.handleInputEvent(e)} />
				<Button value='9' onClick={(e) => this.handleInputEvent(e)} />
				<Button value='/' onClick={(e) => this.handleInputEvent(e)} />
			</div>
			<div className='calculator-row'>
				<Button value='4' onClick={(e) => this.handleInputEvent(e)} /> 
				<Button value='5' onClick={(e) => this.handleInputEvent(e)} />
				<Button value='6' onClick={(e) => this.handleInputEvent(e)} />
				<Button value='*' onClick={(e) => this.handleInputEvent(e)} />
			</div>
			<div className='calculator-row'>
				<Button value='1' onClick={(e) => this.handleInputEvent(e)} />
				<Button value='2' onClick={(e) => this.handleInputEvent(e)} />
				<Button value='3' onClick={(e) => this.handleInputEvent(e)} />
				<Button value='+' onClick={(e) => this.handleInputEvent(e)} />
			</div>
			<div className='calculator-row'>
				<Button value='0' onClick={(e) => this.handleInputEvent(e)} />
				<Button value='.' onClick={(e) => this.handleInputEvent(e)} />
				<Button value='=' onClick={(e) => this.handleInputEvent(e)} />
				<Button value='-' onClick={(e) => this.handleInputEvent(e)} />
			</div>
			<div className="history">
				<History 
					className='history'
					backlogs={backlogs} 
					logged={this.props.logged} 
					itemClickHandler={(backlog) => this.handleHistoryClick(backlog)} 
				/>
			</div>
		</div>
		)
	}
}