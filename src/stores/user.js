/** @module stores/user */

import alt from '../alt.js';
import actions from '../actions.js';
import axios from 'axios';


/**
On success, object with data about user logging in, on fail error message.
@typedef {Object | String} LoginPromise
@property {Integer} idUser Numerical Id of the user
@property {Integer} level Access level of the user
*/

/**
Class providing information about a user
*/
class UserStore {
	/**
	@member {String} username Login name of the user
	@member {String} password Password for this user
	@member {Integer | null} numerical id of the user in the database
	@member {Integer | null} access level for the logged in user
	/**
	Initializes user-related data to no user
	*/
	constructor() {
			this.id = null;
			this.username = '';
			this.password = '';
			this.level = null;
			this.bindActions(actions);
		}
		/**
		Called when a user logs in
		@param {Object} data Login data
		@param {String} data.username Username of the user loging in
		@param {String} data.password Password for the user
		@return {LoginPromise} Promise for server query for user logging in.
		*/
	onLogin(data) {
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
		/**
		Called when the user logs out.
		Nullifies all information about that user.
		*/
	onLogout() {
		axios.get('/data/logout');
		this.username = '';
		this.password = '';
		this.id = null;
		this.level = null;
	}
	onIsLoggedIn(cookie) {
		if (this.id) return void 0;
		var c = '';
		for (var k in cookie) {
			if (cookie.hasOwnProperty(k)) {
				c += k + '=' + cookie[k] + ';';
			}
		}
		return axios.get('/data/isLoggedIn', {
				headers: {
					cookie: c
				}
			}) // eslint-disable-line consistent-return
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

/**
Exports a store for the user currently logged in
@exports {AltStore} UserStore
*/
