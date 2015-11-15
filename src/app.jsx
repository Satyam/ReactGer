/**
 * App entry point
 */

// Polyfill
import 'babel-polyfill';

// Libraries
import React from 'react';
import Router from 'react-router';
import alt from './alt.js';

// load server-side data, if any
alt.isoBootstrap();

import axios from 'axios';
axios.interceptors.request.use(function (config) {
	// the server needs to forward the received cookie to the data service
	// the client doesn't.
	if (config.headers) delete config.headers.cookie;
  return config;
});

import routes from './routes.jsx';
// Start the router
Router.run(routes, Router.HistoryLocation, function(Handler, state) {
	console.log('main:run callback', Handler, state);// eslint-disable-line no-console
    React.render(<Handler/>, global.document.getElementById('app'));
});

