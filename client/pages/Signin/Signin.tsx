import React from 'react';
import { PageComponentProps } from 'client/shared/types';
import { Paper } from 'client/shared/components';
import { Grid } from '@material-ui/core';
import { SigninForm } from './components';

export const Signin: React.FC<PageComponentProps> = React.memo(({ title }) => (
	<Grid className="home" container justify="center" alignItems="center">
		<Paper sizes="small" className="auth-formbox">
			<h1 className="auth-header">{title}</h1>
			<SigninForm />
		</Paper>
	</Grid>
));
