import React from 'react';
import { PageComponentProps } from 'shared/types';
import { Link } from 'react-router-dom';
import { ROUTES } from 'routing';


export const Signin: React.FC<PageComponentProps> = ({ title }) => (
	<div className="auth-page">
		<div className="auth-formbox">
			<h1 className="auth-header">{title}</h1>
			<form>
				<input placeholder="Логин" className="form-input_primary"></input>
				<input placeholder="Пароль" className="form-input_primary"></input>
				<input value="Авторизоваться" type="submit" className="btn btn_primary btn_wide" />
			</form>
			<Link to={ROUTES.SIGNUP.path} className="btn btn_link btn_wide">Нет аккаунта?</Link>
		</div>
	</div>
);
