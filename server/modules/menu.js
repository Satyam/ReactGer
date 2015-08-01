module.exports = function (app, mysql) {
	return {
		get: function (req, res) {

			mysql.getConnection().then(function (connection) {
				return connection.query(
					'select descr, URL, nivel from Menu' +
					' where orden > 0 and (nivel & ?) > 0 and URL is not null and URL <> "" order by orden',
					[req.params.level]
				).then(function (rows) {
					res.send(rows);
				}).fin(function () {
					connection.release();
				});
			});
		}
	};
};
