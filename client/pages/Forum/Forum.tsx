import './Forum.css';

import React from 'react';
import { ROUTES, Routing } from 'client/routing';
import { PageComponentProps } from 'client/shared/types';

export const Forum: React.FC<PageComponentProps> = () => (
    <Routing routes={ROUTES.FORUM.children} />
);
