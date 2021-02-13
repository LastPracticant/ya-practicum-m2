import React from 'react';
import { Link } from 'react-router-dom';
import { ErrorPageProps } from './ErrorPage.types';

export const ErrorPage: React.FC<ErrorPageProps> = ({ errorCode }) => (
	<div>
		<h3>
			Error
			{errorCode}
		</h3>

		<p>
			Вы можете перейти на
			<Link to="/">Главную</Link>
		</p>

	</div>
);
