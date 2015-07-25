	// AutoAsiento
var	AA_APERTURA_CAJA = 4,
	AA_DIF_CAJA_APERTURA = 11,

	// Tipos Anexo
	AX_DIF_CAJA_APERTURA = 13,
	AX_AUN_NO_CERRADA = 15,
	AX_EFVO_APERTURA = 22,

	// Cuentas
	CAJA = '5700000',
	CAJA_N = '5700100',
	OTROS_GASTOS_FINANCIEROS = '6690000',
	OTROS_INGRESOS_FINANCIEROS = '7690000';

module.exports = function (app, mysql) {
	var common = require('./common')(mysql),
		altaAsiento = common.altaAsiento,
		bajaAsiento = common.bajaAsiento;
	return {
	get: function (req, res) {
		mysql.getConnection().then(function (connection) {
			var reply = {fecha: req.params.fecha};
			return connection.query(
				'select  ifnull(sum(debe),0) - ifnull(Sum(haber),0) as inicial from Pases' +
				' where cuenta = ? or cuenta = ?',
				[CAJA, CAJA_N]
			).then(
				function (rows) {
					reply.inicial = rows[0].inicial;
				},
				function (err) {
					res.send(500, 'Arqueo caja inicial error: ' + err);
				}
			).then(function () {
				return connection.query(
					'SELECT idAsiento  FROM Asientos where autoAsiento= ? and Asientos.fecha = ?',
					[AA_APERTURA_CAJA, new Date(req.params.fecha)]
				).then(
					function (rows) {
						reply.idAsiento = rows.length ? rows[0].idAsiento : null;
					},
					function (err) {
						res.send(500, 'Arqueo existe error: ' + err);
					}
				);
			}).then(function () {

				res.send(reply);
			}).fin(function () {
				connection.release();
			});
		});
	},

	save: function (req, res) {
		var d = req.body,
			caja = d.caja,
			fecha = new Date(d.fecha),
			inicial = d.inicial,
			razon = d.razon,
			dif = inicial - caja,
			asiento,
			pases = [];

		var asientoApertura = function (idAsientoDif) {
			var asiento = {
				fecha: fecha,
				descr: 'Caja Inicial',
				autoAsiento: AA_APERTURA_CAJA,
				idUser: req.idUser,
				pases: [
					{
						cuenta: CAJA,
						debe: caja
						},
					{
						cuenta: CAJA,
						haber: caja
						}
					]
				},
				anexos = [];

			if (idAsientoDif) {
				anexos.push({
					tipo: AX_DIF_CAJA_APERTURA,
					numero: idAsientoDif
				});
			}
			anexos.push({
				tipo: AX_EFVO_APERTURA,
				importe: caja
			});
			anexos.push({
				tipo: AX_AUN_NO_CERRADA
			});
			asiento.anexos = anexos;
			altaAsiento(asiento)
				.then(function (asiento) {
					res.location('/asiento/' + asiento.idAsiento);
					res.send(201, asiento);
				})
				.fail(function (err) {
					bajaAsiento(idAsientoDif);
					res.send(500, 'Error alta asiento apertura de caja: ' + err);
				});
		};


		if (Math.abs(dif) >= 0.01) {
			asiento = {
				fecha: fecha,
				descr: razon,
				autoAsiento: AA_DIF_CAJA_APERTURA,
				idUser: req.idUser
			};
			if (dif > 0) {
				pases.push({
					cuenta: CAJA_N,
					haber: dif
				});
				pases.push({
					cuenta: OTROS_GASTOS_FINANCIEROS,
					debe: dif
				});
			} else {
				pases.push({
					cuenta: CAJA_N,
					debe: -dif
				});
				pases.push({
					cuenta: OTROS_INGRESOS_FINANCIEROS,
					haber: -dif
				});
			}
			asiento.pases = pases;
			altaAsiento(asiento)
				.then(function (asientoDif) {
					asientoApertura(asientoDif.idAsiento);
				})
				.fail(function (err) {
					res.send(500, 'Error alta asiento diferencia de caja: ' + err);
				});

		} else {
			asientoApertura();
		}
	}};
};
