import React from 'react';

export default class HistoryItem extends React.Component {
	
	constructor(props) {
		super(props);
		this.logged = this.props.logged;
		this.index = this.props.index;		
		const name = this.props.name;
		const expression = this.props.expression;

		this.state = {inputValue: '', name: name, expression: expression, changed: false};

	}


	/**
	 * set state when user types the name
	 * @param  {[object} event
	 * @return 
	 */
	handleChange(event) {		
		this.setState({inputValue: event.target.value});
	}


	/**
	 * send to server the expression with a name
	 * TODO: refactor and check for name.length > 0
	 */
	saveToServer() {
		const value = this.state.inputValue;
		if (value.length == 0) 
			return;
		const expression = this.state.expression;
		const data = {
			'name': value,
			'expression': expression,
			"_token": window.axios.defaults.headers.common['X-CSRF-TOKEN'], 			
		}
		
		$.ajax({
			type: 'POST',
			url: '/backlog',
			data: data,

		}).done((data) =>  {
			this.setState({name: value, changed: true});
			
		}).fail(function(jqXhr) {
			//should do a lot better
			console.log('failed to register', jqXhr.responseText);
		});

	}

	/**
	 * history item
	 * rerender component when the backlog expression change
	 * @param  {array} nextProps
	 * @return {[type]}           [description]
	 */
	componentWillReceiveProps(nextProps) {
		if (nextProps.expression !== this.expression) {			
			const name = nextProps.name;
			const expression = nextProps.expression;
			this.setState({name: name, expression: expression});
		}
	}
	

	/**
	 * render backlog history when loggedin in
	 */
	_renderLogged() {
		const name = this.state.name;
		const expression = this.state.expression;
		
		return (
			<div className='logged-history-row'>						
				<span>
					{expression}
				</span>
				{(typeof name != 'undefined' && name.length > 0) ? (
					<div className='expression-name'>
					({name})
					</div>
				) : (
					<div className="input-bar">
				          <div>
				             <div className="input-group">
				                <input className="form-control" onChange={(event) => this.handleChange(event)} />
				                <span className="input-group-btn">
				                  <button className="btn btn-info" value ='send' onClick={() => this.saveToServer()}>Save</button>
				                </span>
				            </div>
				          </div>						        
				      </div>		
					)
				}
			</div>				
		)
	}


	/**
	 * render backlog when not logged
	 */
	_renderGuest() {
		const expression = this.state.expression;
		return(
			<div>
				{expression}
			</div>
		)
	}


	render() {		
		const listItemContent = (this.logged == 1) ? this._renderLogged() : this._renderGuest();
		const expression = this.state.expression;
		return (
			<li onClick={() => this.props.itemClickHandler(expression)}>
					{listItemContent}
			</li>	
		)
	}
}