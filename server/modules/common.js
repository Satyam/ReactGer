var Q = require('q');
var OTROS_GASTOS_FINANCIEROS_DIF_CAJA = '6690002',
	OTROS_INGRESOS_FINANCIEROS_DIF_CAJA = '7690002';
module.exports = function (mysql) {
	return {
	altaAsiento: function (asiento) {
		var dif = asiento.pases.reduce(function(acc, pase) {
			var debe = pase.debe,
				haber = pase.haber;
			if (debe) {
				debe = pase.debe = parseInt(debe.toFixed(2), 0);
			}
			if (haber) {
				haber = pase.haber = parseInt(haber.toFixed(2), 10);
			}
			return acc + debe - haber;
		}, 0);
		if (Math.abs(dif) >= 0.01) {
			if (dif < 0) {
				asiento.pases.push({
					cuenta: OTROS_GASTOS_FINANCIEROS_DIF_CAJA,
					debe: -dif
				});
			}else {
				asiento.pases.push({
					cuenta: OTROS_INGRESOS_FINANCIEROS_DIF_CAJA,
					haber: dif
				});
			}
		}

		return mysql.getConnection().then(function (connection) {
			return connection.beginTransaction().then(function () {
				return connection.query(
					'Insert Into Asientos (fecha,descr,autoAsiento,idUser) values (?,?,?,?)',
					[asiento.fecha, asiento.descr, asiento.autoAsiento, asiento.idUser]
				).then(function (result) {
					asiento.idAsiento = result.insertId;

					return Q.all((asiento.pases || []).map(function (pase) {
						return connection.query(
							'Insert Into Pases (idAsiento,cuenta,debe,haber) values (?,?,?,?)',
							[asiento.idAsiento, pase.cuenta, pase.debe, pase.haber]
						).then(function (result) {
							pase.idPase = result.insertId;
						});
					})).done(function () {
						// console.log('pases done');
					});
				}).then(function () {
					return Q.all((asiento.anexos || []).map(function (anexo) {
						return connection.query(
							'Insert Into Anexos (idAsiento,tipo,numero,importe,texto,fecha) values (?,?,?,?,?,?)',
							[asiento.idAsiento, anexo.tipo, anexo.numero, anexo.importe, anexo.texto, new Date(anexo.fecha)]
						).then(function (result) {
							anexo.idAnexo = result.insertId;
						});
					})).done(function () {
						// console.log('anexos done');
					});
				}).then(function () {
					return connection.commit();
				}).then(
					function () {
						return asiento;
					},
					function (err) {
						connection.rollback();
						throw err;
					}
				);
			}).fin(function () {
				connection.release();
			});
		});
	},
	bajaAsiento: function (idAsiento) {
	},
	getAsiento: function (idAsiento) {
		var asiento = {};
		return mysql.getConnection().then(function (connection) {
			console.log('getAsiento 1', asiento);
			return connection.query(
				'select a.*, taa.descr as Operacion, u.username from Asientos a inner join TiposAutoAsiento taa' +
				'  on a.AutoAsiento = taa.codigo inner join Users u using (idUser) where idAsiento = ?',
				[idAsiento]
			).then(function (rows) {
				console.log('getAsiento 2', asiento, rows);
				if (rows.length) {
					asiento = rows[0];
					console.log('getAsiento 3', asiento);
					return connection.query(
						'select Pases.*, Cuentas.descr as nombre from Pases inner join' +
						' Cuentas on Pases.cuenta = Cuentas.codigo where idAsiento =  ?',
						[idAsiento]
					).then(function (rows) {
						asiento.pases = rows;
						console.log('getAsiento 4', asiento, rows);
						return connection.query(
							'select a.*,ta.descr from Anexos a inner join TiposAnexos ta' +
							' on a.tipo = ta.codigo where idAsiento =  ?',
							[idAsiento]
						).then(function (rows) {
							asiento.anexos = rows;
							console.log('getAsiento 5', asiento, rows);
						});
					}).then(function () {
						console.log('getAsiento 6', asiento);
						return asiento;
					});
				}
			}).fin(function () {
				connection.release();
			});
		});
	}};
};
