import alt from '../alt.js';
import actions from '../actions.js';
import axios from 'axios';
import {dataUrl} from '../common/common.js';

class AsientosStore {
	constructor() {
		console.log('AsientosStore.constructor');
		this.asientos = [];
		this.bindActions(actions);
	}
	onListaAsientos (opts) {
		if (this.listaPendiente) return false;
		this.listaPendiente = true;
		console.log('AsientosStore.onListaAsientos');
		axios.get(dataUrl('asientos'), {params: opts})
		.then(response => {
			this.listaPendiente = false;
			console.log('AsientosStore.onListaAsientos.then');
			this.asientos = response.data;
			this.asientos.forEach(asiento => {
				asiento.fecha = new Date(asiento.fecha);
			});
			this.alt.pending--;
			this.emitChange();
		})
		.catch(response => {
			console.log('AsientosStore.onListaAsientos.error', response);
			this.alt.pending--;
			this.emitChange();
		});
		this.alt.pending++;
		return false;
	}
}

export default alt.createStore(AsientosStore, 'AsientosStore');
