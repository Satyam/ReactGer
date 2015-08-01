import React from 'react'; // eslint-disable-line no-unused-vars
import actions from '../../actions.js';
import {Componente} from '../../common/common.js';

import classNames from 'classnames';

import userStore from '../../stores/user.js';

export default class Login extends Componente {
	getStores () {
		return [
			userStore
		];
	}
  componentDidMount () {
    actions.isLoggedIn();
  }
	onUsernameChange (name) {
		this.username = name;
	}
	onPasswordChange (password) {
		this.password = password;
	}
	render () {
		var s = this.state;

		return s.id ? (
			<div className="whoami">
				<p>Usuario: {s.username}</p>
				<button
					onClick={() => {
						actions.logout();
						this.context.router.transitionTo('app');
					}}
					className="btn btn-warning"
				>
					Logout
				</button>
			</div>
		) : (
			<div>
				<div className={classNames('form-group', {'has-error': this.state.error})}>
					<label className='control-label' htmlFor="username">Nombre de Usuario</label>
					<input type="text" className="form-control"
						name="username"
						defaultValue={s.username}
						onChange={ev => this.setState({username: ev.target.value})}
					/>
					<div className={classNames('control-label', {hidden: s.error !== 'ERRUSER'})}>
						Nombre de usuario incorrecto
					</div>
				</div>
				<div className={classNames('form-group', {'has-error': this.state.error})}>
					<label className='control-label' htmlFor="password">Contraseña</label>
					<input type="password" className="form-control"
						name="password"
						defaultValue={s.password}
						onChange={ev => this.setState({password: ev.target.value})}
						/>
					<div className={classNames('control-label', {hidden: s.error !== 'ERRPWD'})}>
						Contraseña incorrecta
					</div>
				</div>
				<button
					className="btn btn-primary"
					disabled={!(s.username.length && s.password.length)}
					onClick={() => actions.login({username: s.username, password: s.password})}
				>Entrar</button>
			</div>
		);
	}
}

Login.contextTypes = {
	router: React.PropTypes.func.isRequired
};
