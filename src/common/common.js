export function leftButton (ev) {
	if (ev.button !== 0) return false;
	if (ev.metaKey || ev.altKey || ev.ctrlKey || ev.shiftKey) return false;
	ev.preventDefault();
	ev.stopPropagation();
	return true;
}

import React from 'react';
import _ from 'lodash';

var unlisteners = Symbol('unlisteners');

export class Componente extends React.Component {
	constructor (props, context) {
		super(props, context);
		// this._stores = this.get;
		this.state = {};
		this[unlisteners] = _.map(this.getStores(), store => {
			Object.assign(this.state, store.getState());
			return store.listen(state => {
				this.setState(state);
			});
		});
	}
//	constructor (props, context, stores) {
//		super(props, context);
//		this._stores = stores;
//		this.state = {};
//		_.each(stores, store => {
//			Object.assign(this.state, store.getState());
//		});
//	}
//	componentDidMount () {
//		this[unlisteners] = _.map(this._stores, store => {
//			return store.listen(state => {
//				this.setState(state);
//			});
//		});
//	}
	componentWillUnmount () {
		this[unlisteners].forEach(u => u());
	}
}

export function dataUrl(url) {
	// for browser
	if (typeof window !== 'undefined') {
		return 'http://localhost:8000/data/' + url;
	}
	// For node
	if (typeof process !== 'undefined') {
		return 'http://localhost:8000/data/' + url;
	}
	return url;
}
