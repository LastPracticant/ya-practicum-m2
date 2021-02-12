import React from 'react';
import { PageComponentProps } from 'shared/types';
import { Link } from 'react-router-dom';
import { ROUTES } from 'routing';


export const Signin: React.FC<PageComponentProps> = ({ title }) => (
	<div className="page-container">
		<div className="auth-container">
			<h1 className="auth-header">{title}</h1>
			<form>
				<input placeholder="Логин" className="form-input_primary"></input>
				<input placeholder="Пароль" className="form-input_primary"></input>
				<input value="Авторизоваться" type="submit" className="primary-button" />
			</form>
			<Link to={ROUTES.SIGNUP.path} className="help-button">Нет аккаунта?</Link>
		</div>
	</div>

);