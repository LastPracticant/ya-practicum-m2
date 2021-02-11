import React from 'react';
import { PageComponentProps } from 'client/shared/types';

export const Game: React.FC<PageComponentProps> = ({ title }) => (
	<div>
		{title}
	</div>
);
