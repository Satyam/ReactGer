import React from 'react';
import {Link} from 'react-router';

import {Componente} from '../../common/common.js';

import classNames from 'classnames';

import menuStore from '../../stores/menu.js';

export default class Menu extends Componente {
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

					{this.context.router.namedRoutes[menuItem.URL] ?
						(<Link to={menuItem.URL}>{menuItem.descr}</Link>) :
						(<a href={menuItem.URL}>{menuItem.descr}</a>)
					}
					</li>
				))}
			</ul>
		);
	}
}

Menu.contextTypes = {
	router: React.PropTypes.func.isRequired
};
