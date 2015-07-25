import alt from '../alt.js';
import actions from '../actions.js';
import axios from 'axios';
import {dataUrl} from '../common/common.js';


class MenuStore {
	constructor() {
		this.menu = [];
		this.bindActions(actions);
	}
	onLoggedIn (user) {
		axios.get(dataUrl('menu/' + user.level))
		.then(response => {
			this.menu = response.data;
			this.emitChange();

			console.log(this.menu.map(item => `<Route name="${item.URL}" handler={${item.URL}} />`).join('\n'));
			console.log(this.menu.map(item => `import ${item.URL} from '../${item.URL}/${item.URL}.jsx';`).join('\n'));
		});
		return false;
	}
	onLogout () {
		this.menu = [];
	}
}

export default alt.createStore(MenuStore, 'MenuStore');
