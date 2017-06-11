
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other libraries. 
 */

require('./bootstrap');
import Calculator from './components/calculator';

const root = document.getElementById('root');

let logged = 0;

if (root) {
	logged = root.dataset.logged;
	ReactDOM.render(
		<Calculator logged={logged} />,
		document.getElementById('root'),
	);
}




