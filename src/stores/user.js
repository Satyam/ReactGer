import alt from '../alt.js';
import actions from '../actions.js';
import axios from 'axios';
import {dataUrl} from '../common/common.js';

class UserStore {
	constructor() {
		this.menu = [];
		this.id = null;
		this.username = '';
		this.password = '';
		this.level = null;
		this.bindActions(actions);
	}
	onLogin (data) {
		this.username = data.username;
		this.password = data.password;
		axios.post(dataUrl('login'), data)
		.then(response => {
			var d = response.data;
			this.id = d.idUser;
			this.level = d.level;
			actions.loggedIn(this);
			this.emitChange();
		})
		.catch(response => console.log('login error', response));
		return false;
	}
	onLogout () {
		axios.get(dataUrl('logout'));
		this.username = '';
		this.password = '';
		this.id = null;
		this.level = null;
	}
}

export default alt.createStore(UserStore, 'UserStore');
