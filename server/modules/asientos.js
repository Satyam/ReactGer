module.exports = function (app, mysql) {
	var common = require('./common')(mysql),
		altaAsiento = common.altaAsiento,
		bajaAsiento = common.bajaAsiento,
		getAsiento = common.getAsiento;
	return {
		get: function (req, res) {
			getAsiento(parseInt(req.params.idAsiento, 10)).then(
				function (asiento) {
					res.send(asiento);
				},
				function (err) {
					res.status(500).send('Error: getAsiento: ' + err);
				}
			);
		},
		list: function (req, res) {
			var p = req.params,
				limit = p.cant || 50;
			console.log('/data/asientos.list');
			return mysql.getConnection().then(function (connection) {
				return connection.query(
					'select idAsiento, fecha, Asientos.descr, TiposAutoAsiento.descr as tipo from Asientos ' +
					'inner join TiposAutoAsiento on (Asientos.autoAsiento = TiposAutoAsiento.codigo) limit ?',
					[limit]
				).then(function (rows) {
					console.log('/data/asientos.list reply');
					res.send(rows);
				});
			});
		}
	};
};
