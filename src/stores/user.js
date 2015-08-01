import alt from '../alt.js';
import actions from '../actions.js';
import axios from 'axios';

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
		this.password = '';
		return axios.post('/data/login', data)
		.then(response => {
			var d = response.data;
			this.id = d.idUser;
			this.level = d.level;
			actions.loggedIn(this);
		})
		.catch(response => console.log('login error', response));
	}
	onLogout () {
		axios.get('/data/logout');
		this.username = '';
		this.password = '';
		this.id = null;
		this.level = null;
	}
  onIsLoggedIn (cookie) {
		if (this.id) return;
		var c = '';
		for (var k in cookie) {
			if (cookie.hasOwnProperty(k)) {
				c += k + '=' + cookie[k] + ';';
			}
		}
    return axios.get('/data/isLoggedIn', {headers: {cookie: c}}) // eslint-disable-line consistent-return
    .then(response => {
      var d = response.data;
      console.log('isLoggedIn:', d);
			this.id = d.idUser;
			this.level = d.level;
      this.username = d.username || '';
      if (this.id) {
        actions.loggedIn(this);
      }
    });
  }
}

export default alt.createStore(UserStore, 'UserStore');
