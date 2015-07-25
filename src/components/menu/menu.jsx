import React from 'react';
import {Link} from 'react-router';

import {Componente} from '../../common/common.js';

import classNames from 'classnames';

import menuStore from '../../stores/menu.js';

export default class Main extends Componente {
	getStores () {
		return [
			menuStore
		];
	}
	render () {
		var path = this.context.router.getCurrentPath();

		return (
			<ul className="nav nav-pills nav-stacked">
				{this.state.menu.map((menuItem, index) => (
					<li key={index} className={classNames({active: menuItem.URL === path})}>
					{menuItem.URL === 'AbreCaja' ?
						(<Link to={menuItem.URL}>{menuItem.descr}</Link>) :
						(<a href={menuItem.URL}>{menuItem.descr}</a>)
					}
					</li>
				))}
			</ul>
		);
	}
}

Main.contextTypes = {
	router: React.PropTypes.func.isRequired
};
