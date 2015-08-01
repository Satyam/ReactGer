var DATA_ROOT = '/data/',
	MODULES = './modules/';

module.exports = function (app, mysql) {

	var menu = require(MODULES + 'menu.js')(app, mysql);
	app.get(DATA_ROOT + 'menu/:level', menu.get);

	var arqueo = require(MODULES + 'arqueo.js')(app, mysql);
	app.get(DATA_ROOT + 'arqueo/get/:fecha', arqueo.get);
	app.post(DATA_ROOT + 'arqueo', arqueo.save);

	var asientos = require(MODULES + 'asientos.js')(app, mysql);
	app.get(DATA_ROOT + 'asientos/:idAsiento', asientos.get);
	app.get(DATA_ROOT + 'asientos', asientos.list);

	var users = require(MODULES + 'users.js')(app, mysql);
  var session = app.get('session');
	app.post(DATA_ROOT + 'login', session, users.login);
	app.get(DATA_ROOT + 'logout', session, users.logout);
	app.get(DATA_ROOT + 'isLoggedIn', session, users.isLoggedIn);
};
