const REGEXPS = {
	VALID: /[0-9.+\-*\/=]/,
	NUMBER: /\d/,
	OPERATOR: /[+\-*\/]/,	

}


/**
 * main calculator logic. 
 * Char insertion is handled one at a time
 * the handle{Something} methods manage all the little details. 
 *
 * current represents the current input
 * while the backlog is the buffer of the already handled insertions
 * TODO: write tests
 *
 */
export default class Expression {
	
	constructor() {
		this.current = '';
		this.backlog = '';
		this.isDecimal = false;
		this.isEditable = true;
	}


	/**
	 * Dispatch a valid input char to its handler
	 * A callback is passed to be run when it's time to
	 * compute the result
	 * @param  {char} char
	 * @return {obejct} { current, backlog }     
	 */
	handleInput(char, evaluateCallback) {
		if (this.isValid(char)) {
			if (this.isNumber(char)) this.handleNumber(char);
			if (this.isOperator(char)) this.handleOperator(char);
			if (this.isDot(char)) this.handleDot();
			if (this.isEqual(char)) this.evaluate(evaluateCallback);
		}	
		return { current: this.current, backlog: this.backlog };
		
	}


	/**
	 * handle new number.
	 * Corner cases: 
	 * 	- the current number is 0
	 * 	- the current is not editable;
	 * @param  {char} char
	 * @return {void}
	 */
	handleNumber(char) {		
		//remove not valid first 0 char or non editable current
		if ((this.current.length === 1 && this.current === '0') ||
			!this.isEditable) {
				this.current = char;
				this.isEditable = true;
			}
		else this.current += char;
	}


	/**
	 * handle a new dot
	 * 	- if it's first char, insert a 0 in front of it
	 * @return {void} 
	 */
	handleDot() {
		if (this.isDecimal) return;
		if (this.current.length === 0 || !this.isEditable)  {
			this.current = '0.';
			this.isEditable = true;
		}
		else this.current += '.';
		this.isDecimal = true;
	}


	/**
	 * when an operator is inserted the current expression
	 * is appended to the backlog with the operator trailing
	 * and current is resetted.
	 *   - minus sign is valid as first char of the current expression
	 * @param  {char} char
	 * @return {void}
	 */
	handleOperator(char) {
		if (this.current.length === 0) {
			if (char === '-') this.current = char;
		}
		else {
			this.updateBacklog(char);
			this.isDecimal = false;
			this.current = '';
		}
	}


	/**
	 * evaluate the current backlog
	 * 	- if it's called after an operator or dot, remove them
	 * @return {[type]} [description]
	 */
	evaluate(callback) {
		if (this.current.length === 0) this.removeTrailingSymbols();
		this.backlog += this.current;
		try {
			const result = eval(this.backlog);				
			if (typeof callback !== 'undefined') {
				callback(this.backlog);
			}

			this.current = result.toString();
			this.isEditable = false;
			this.isDecimal = false;
			this.backlog = '';
			

		} catch(exception) {
			
		}

	}


	/**
	 * Update backlog when an operator is inserted and
	 * there is a meaningful current value
	 * @param  {char} operator 
	 * @return {void}      
	 */
	updateBacklog(operator) {
		if (this.current.length === 0) this.changeLastBacklogOperator(operator);
		else {
			if (this.current === '0.') this.current = '0';
			this.backlog += this.current + operator;			
		}
	}


	changeLastBacklogOperator(operator) {
		this.removeTrailingSymbols();
		this.backlog += operator;		
	}


	removeTrailingSymbols() {
		const backlogLength = this.backlog.length;
		const last = this.backlog[backlogLength - 1];
		if (this.isOperator(last) || this.isDot(last)) 
			this.backlog = this.backlog.slice(0, backlogLength -1);
	}	


	/**
	 * check if char is a valid expression value
	 * @param  {char}  char 
	 * @return {Boolean} 
	 */
	isValid(char) {
		return REGEXPS.VALID.test(char);
	}

	isNumber(char) {
		return REGEXPS.NUMBER.test(char);
	}

	isOperator(char) {
		return REGEXPS.OPERATOR.test(char);
	}

	isDot(char) {
		return char === '.';
	}

	isEqual(char) {
		return char === '=';
	}


	/**
	 * return current value to display
	 * @return {string} 
	 */
	getCurrent() {
		return this.current;
	}


	/**
	 * return the already inserted expresssion		
	 * @return {string}
	 */
	getBacklog() {
		return this.backlog;
	}

	/**
	 * set the backlog	
	 * @return this
	 */
	setBacklog(backlog) {
		this.backlog = backlog;
		return this;
	}

	clear() {
		this.current = '';
		this.backlog = '';
		this.isDecimal = false;
		this.isEditable = true;
	}
}