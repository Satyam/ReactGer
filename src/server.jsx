import React from 'react';
import Router from 'react-router';
import routes from './routes.jsx';
import fs from 'fs';

var template = null;

// Polyfill
import 'babel-core/polyfill';

import alt from './alt.js';

export default function (app) {
	app.use(function (req, res, next) {
		console.log('path:', req.path);
		Router.run(routes, req.path, function (Handler, state) {
			if (state.routes.some(route => route.name === 'notFound')) {
				next();
				return;
			}
			console.log('Inside Router.run');
			var send = function () {
				console.log('trying to send', alt.pending);
				var r = React.renderToString(<Handler />);
				if (alt.pending) {
					setTimeout(send, 1);
					return;
				}
				console.log('sending');
				r += '<script type="application/json" id="altSnapshot">' + alt.flush() + '</script>';
				res.send(template.replace('<!--content-->', r));
			};
			if (template) {
				send();
			} else {
				fs.readFile('src/index.html', {encoding: 'utf8'}, (err, data) => {
					if (err) {
						res.status(500).send(err);
						return;
					}
					template = data;
					send();
				});
			}
		});
	});
}
