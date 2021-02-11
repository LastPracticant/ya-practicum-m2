import React from 'react';
import { PageComponentProps } from 'client/shared/types';

export const Forum: React.FC<PageComponentProps> = ({ title }) => (
	<div>
		{title}
	</div>
);
