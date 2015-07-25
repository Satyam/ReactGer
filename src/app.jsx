/**
 * App entry point
 */

// Polyfill
import 'babel-core/polyfill';

// Libraries
import React from 'react';
import Router from 'react-router';

import routes from './routes.jsx';
// Start the router
Router.run(routes, Router.HistoryLocation, function(Handler, state) {
	console.log('main:run callback', Handler, state);// eslint-disable-line no-console
    React.render(<Handler/>, global.document.getElementById('app'));
});

