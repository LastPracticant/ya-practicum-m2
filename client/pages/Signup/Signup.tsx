import React from 'react';
import { PageComponentProps } from 'client/shared/types';
import { NivelatorXY, Paper } from 'client/shared/components';
import { withCheckAuth } from 'client/core/HOCs';
import { Logo, Meta } from 'client/core';
import { SignupForm } from './components';

const SignupComponent: React.FC<PageComponentProps> = React.memo(({ title }) => (
	<NivelatorXY>
        <Meta title={title} />
        <Logo />
		<Paper sizes="small">
			<h1>{title}</h1>
			<SignupForm />
		</Paper>
	</NivelatorXY>
));

export const Signup = withCheckAuth(SignupComponent);
