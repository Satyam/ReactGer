/*eslint-disable no-process-env , no-console, no-mixed-requires*/
var express = require('express'),
	session = require('express-session'),
	app = express(),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	http = require('http'),
	path = require('path'),
	MQ = require('./modules/mysqlq');

var production = process.argv.some(function (arg) {
	return arg === '--production' || arg === '-p';
}) || process.env.PRODUCTION;

console.log(production ? 'production' : 'development');

var mysql = new MQ({
	// debug: true,
	host: 'localhost',
	user: 'root',
	database: 'geruma'
});

app.set('mysql', mysql);

app.use(bodyParser.json());
app.use(cookieParser());
app.set('session', session({
	secret: 'geruma valplata',
	resave: false,
	saveUninitialized: true
}));

app.get('/app.js', function (req, res) {
	if (production) {
		console.log('get /app.js');
		res.sendFile(path.join(__dirname, '../build/app.js'));
	} else {
		console.log('get /app.js (hot load)');
		res.redirect('//localhost:9090/build/app.js');
	}
});

app.get('/styles.css', function (req, res) {
	res.sendFile(path.join(__dirname, '../build/styles.css'));
});

// app.use(require('./modules/users.js')(app, mysql).check);

require('./datasources.js')(app, mysql);

require('../build/server.js')(app);

app.use(express.static(path.join(__dirname, '../src')));

var port = process.env.PORT || 8000;
var server = http.createServer(app);

server.listen(port, function () {
  var a = server.address();
  console.log('Listening at %s in %s mode', a.port, app.get('env'));
});

if (!process.env.PRODUCTION) {
	var webpack = require('webpack');
	var WebpackDevServer = require('webpack-dev-server');
	var config = require('../webpack.client.dev.config.js');

	new WebpackDevServer(webpack(config), {
		publicPath: config.output.publicPath,
		hot: true,
		noInfo: true,
		historyApiFallback: true
	}).listen(9090, 'localhost', function (err) {
		if (err) {
			console.log(err);
		}
	});
}
