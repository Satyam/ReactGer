import alt from '../alt.js';
import actions from '../actions.js';
import axios from 'axios';

class MenuStore {
	constructor() {
		this.menu = [];
		this.level = null;
		this.bindActions(actions);
	}
	onLoggedIn (user) {
		if (this.level === user.level) return;
		return axios.get('/data/menu/' + user.level) // eslint-disable-line consistent-return
		.then(response => {
			this.menu = response.data;

// console.log(this.menu.map(item => `<Route name="${item.URL}" handler={${item.URL}} />`).join('\n'));
// console.log(this.menu.map(item => `import ${item.URL} from '../${item.URL}/${item.URL}.jsx';`).join('\n'));
		});
	}
	onLogout () {
		this.menu = [];
		this.level = null;
	}
}

export default alt.createStore(MenuStore, 'MenuStore');
