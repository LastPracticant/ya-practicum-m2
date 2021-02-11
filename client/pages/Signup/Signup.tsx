import React from 'react';
import { PageComponentProps } from 'client/shared/types';
import { SignupForm } from './components';

export const Signup: React.FC<PageComponentProps> = React.memo(({ title }) => (
	<div>
		<header>
			{title}
		</header>
		<main>
			<SignupForm />
		</main>
	</div>
));
