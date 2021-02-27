import React from 'react';
import { PageComponentProps } from 'client/shared/types';
import { NivelatorXY, Paper } from 'client/shared/components';
import { HOKAuth } from 'client/core/HOKs';
import { SignupForm } from './components';

const SignupComponent: React.FC<PageComponentProps> = React.memo(({ title }) => (
	<NivelatorXY className="home">
		<Paper sizes="small">
			<h1>{title}</h1>
			<SignupForm />
		</Paper>
	</NivelatorXY>
));

export const Signup = HOKAuth(SignupComponent);
