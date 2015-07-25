/*jshint node:true */
var mysql = require('mysql'),
	Q = require('q');

var MQ = function (config) {
	this._config = config;
};
var Conn = function (conn, pooled) {
	this._conn = conn;
	this._pooled = pooled;
};
MQ.prototype = {
	_pool: false,
	getConnection: function (pooled) {
		var done = Q.defer();

		if (pooled !== false) {
			if (!this._pool) {
				this._pool = mysql.createPool(this._config);
			}
			this._pool.getConnection(function (err, connection) {
				if (err) {
					done.reject(err);
				} else {
					done.resolve(new Conn(connection, pooled));
				}
			});
		} else if (!this._conn) {
			var conn = mysql.createConnection(this._config);
			conn.connect(function (err) {
				if (err) {
					done.reject(err);
				} else {
					done.resolve(this._conn = new Conn(this._conn, pooled));
				}
			});
		} else {
			done.resolve(this._conn);
		}
		return done.promise;
	}
};

Conn.prototype = {
	_conn: null,
	_pooled: false,

	query: function (sql, params) {
		var done = Q.defer();
		this._conn.query(sql, params, function (err, results) {
			if (err) {
				// console.log('err',err);
				done.reject(err);
			} else {
				// console.log('results', results);
				done.resolve(results);
			}
		})
		// .sql)
		;
		return done.promise;
	},
	rollback: function () {
		var done = Q.defer();
		this._conn.rollback(function (err) {
			if (err) {
				done.reject(err);
			} else {
				done.resolve();
			}
		});
		return done.promise;
	},
	beginTransaction: function () {
		var done = Q.defer();
		this._conn.beginTransaction(function (berr) {
			if (berr) {
				this.rollback().then(
					function () {
						done.reject(berr);
					},
					function (rerr) {
						done.reject([berr, rerr]);
					}
				);
			} else {
				done.resolve();
			}
		});
		return done.promise;
	},
	commit: function () {
		var done = Q.defer();
		this._conn.commit(function (err) {
			if (err) {
				this.rollback().then(
					function () {
						done.reject(err);
					},
					function (rerr) {
						done.reject([err, rerr]);
					}
				);
			} else {
				done.resolve();
			}
		});
		return done.promise;
	},
	release: function () {
		if (this._pooled) {
			this._conn.release();
			this._conn = null;
		}
		Q(true);
	},
	end: function () {
		var done = Q.defer();
		this._conn.end(function (err) {
			if (err) {
				done.reject(err);
			} else {
				done.resolve();
			}
		});
		this._conn = null;
		return done.promise;
	}
};

module.exports = MQ;
