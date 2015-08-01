import React from 'react';
import Router from 'react-router';
import routes from './routes.jsx';
import actions from './actions.js';
import fs from 'fs';

var template = null;

// Polyfill
import 'babel-core/polyfill';

import alt from './alt.js';

import axios from 'axios';
axios.interceptors.request.use(function (config) {
  config.url = config.url.replace(/^\/data\//, 'http://localhost:8000/data/');
  return config;
});

export default function (app) {
	app.use(function (req, res, next) {
    var cookie = req.cookies;
		console.log('path:', req.path);
		Router.run(routes, req.path, function (Handler, state) {
			if (state.routes.some(route => route.name === 'notFound')) {
				next();
				return;
			}
      state.routes.forEach(route => {
        switch (route.name) {
          case 'Asientos':
            actions.listaAsientos();
            break;
          case 'app':
            actions.isLoggedIn(cookie);
            break;
        }
      });
			state.params.cookie = cookie;
			console.log('Inside Router.run');
			var send = function () {
				console.log('trying to send');
        alt.whenStable(function (dataEl) {
          console.log('sending');
          res.send(
            template.replace(
              '<!--content-->',
              React.renderToString(<Handler params={state.params} query={state.query} />) + dataEl
            )
          );
        });
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
