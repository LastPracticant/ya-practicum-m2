import React from 'react';
import { PageComponentProps } from 'client/shared/types';
import { NivelatorXY, Paper } from 'client/shared/components';
import { SignupForm } from './components';

export const Signup: React.FC<PageComponentProps> = React.memo(({ title }) => (
	<NivelatorXY>
		<Paper sizes="small">
			<h1>{title}</h1>
			<SignupForm />
		</Paper>
	</NivelatorXY>
));
