/*eslint-disable no-process-env , no-console, no-mixed-requires*/
module.exports = function (app, mysql) {
	return {
		check: function (req, res, next) {
			console.log('user check', req.path, req.session.idUser, req.session.level);
			if (req.path === '/data/login' || req.path === '/data/logout') {
				next();
			} else if (req.session.idUser) {
				next();
			} else {
				res.status(401).send('Must Login');
			}
		},
    isLoggedIn: function (req, res) {
      var s = req.session;
      if (s.idUser) {
        res.send({
          idUser: s.idUser,
          level: s.level,
          username: s.username

        });
      } else {
        res.send({});
      }
    },
		login: function (req, res) {
			console.log('login query', req.body);
      var s = req.session;
			var username = req.body.username || '',
				password = req.body.password || '';

			console.log('login', username, password);
			if (username) {

				mysql.getConnection().then(function (connection) {
					return connection.query(
						'select * from Users where username = ?', [username]
					).then(function (rows) {
						if (rows.length !== 1) {
							console.log('user not found', username);
							res.send(401, 'ERRUSER');
							return;
						}
						var row = rows[0];
						if (row.password !== require('crypto').createHash('md5').update(password).digest('hex')) {
							console.log('passwords do not match');
							res.send(401, 'ERRPWD');
							return;
						}
            s.username = username;
						s.idUser = row.idUser;
						s.level = row.level;
            s.save(function (err) {
              if (err) console.warn('error saving session', err);
            });
						res.send({
							idUser: row.idUser,
							level: row.level
						});
					}).fail(function (err) {
						res.send(500, err);
					}).fin(function () {
						connection.release();
					});
				});
			} else {
				res.send(401, 'ERRNOUSER');
			}
		},
		logout: function (req, res) {
			req.session.destroy();
			res.end();
		}
	};
};
