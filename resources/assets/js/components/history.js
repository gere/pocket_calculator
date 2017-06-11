import React from 'react';
import SearchInput, {createFilter} from 'react-search-input';
import HistoryItem from './historyitem';

const KEYS_TO_FILTERS = ['name'];

export default class History extends React.Component {

	constructor(props) {
		super(props);		
		this.logged = this.props.logged;
		
		this.state = {searchTerm: '', backlogs: this.props.backlogs};		
	}


	searchUpdated(term) {
		this.setState({searchTerm: term});
	}


	/**
	 * render again component when new backlogs are added
	 * @param  {array} nextProps
	 */
	componentWillReceiveProps(nextProps) {		
		if (nextProps.backlogs.length !== this.state.backlogs.length) {
			this.setState({backlogs: nextProps.backlogs});
		}
	}
	

	render() {		
		const filteredBacklogs = this.state.backlogs.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
											
		return(
			<div>{this.logged == 1 && 
				  <SearchInput 
					className="search-input" 
					onChange={(term) => this.searchUpdated(term)} /> }
				<ul className="history-list">				
					{filteredBacklogs.map((backlog, index) => {						
						return (
							<HistoryItem 
								key={index} 
								index={index} 
								name={backlog.name} 
								expression={backlog.expression} 
								logged={this.logged} 
								itemClickHandler={this.props.itemClickHandler}
							/>
						)}
					)}
				</ul>
			</div>
		)		
	}
}