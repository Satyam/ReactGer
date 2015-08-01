import React from 'react'; // eslint-disable-line no-unused-vars

import {Componente} from '../../common/common.js';
import AsientosStore from '../../stores/asientos.js';
import actions from '../../actions.js';

export default class Asientos extends Componente {
	constructor (props, context) {
		console.log('Asientos.constructor');
		super(props, context);
	}
	getStores () {
		return [AsientosStore];
	}
	componentDidMount () {
		console.log('Asientos.componentWillMount');
		actions.listaAsientos();
	}
	render () {
		console.log('Asientos.render');
		return (
			<table className="table table-bordered table-stripped">
				<thead><tr><th>Asiento</th><th>Fecha</th><th>Descripción</th><th>Operación</th></tr></thead>
				<tbody>
					{this.state.asientos.map((asiento, row) => (
						<tr key={row}>
							<td><a href={'/asientos/' + asiento.idAsiento}>{asiento.idAsiento}</a></td>
							<td>{asiento.fecha.toDateString()}</td>
							<td>{asiento.descr}</td>
							<td>{asiento.tipo}</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	}
}
