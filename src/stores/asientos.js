import alt from '../alt.js';
import actions from '../actions.js';
import axios from 'axios';

class AsientosStore {
	constructor() {
		console.log('AsientosStore.constructor');
		this.asientos = [];
		this.bindActions(actions);
    this.on('bootstrap', this.fixFechas);
	}
	onListaAsientos (opts) {
		console.log('AsientosStore.onListaAsientos');
		return axios.get('/data/asientos', {params: opts})
		.then(response => {
			console.log('AsientosStore.onListaAsientos.then');
			this.asientos = response.data;
      this.fixFechas();
		}, response => {
			console.log('AsientosStore.onListaAsientos.com error', response);
		})
		.catch(err => console.log('AsientosStore.onListaAsientos fatal', err));
	}
  fixFechas () {
    this.asientos.forEach(asiento => {
      asiento.fecha = new Date(asiento.fecha);
    });
  }
	onLogout () {
		this.asientos = [];
	}
}

export default alt.createStore(AsientosStore, 'AsientosStore');
