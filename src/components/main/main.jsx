import React from 'react';
import {RouteHandler} from 'react-router';

import Login from '../login/login.jsx';
import Menu from '../menu/menu.jsx';

export default class Main extends React.Component {
	render () {
		console.log('Main.render');
		return (
			<div className="row">
				<div className="col-lg-2 col-md-2 col-sm-3 col-xs-3">
					<div className="logo"></div>
					<Login />
					<Menu />
				</div>
				<div className="col-lg-10 col-md-10 col-sm-9 col-xs-9">
					<RouteHandler />
				</div>
			</div>
		);
	}
}
