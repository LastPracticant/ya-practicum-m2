import React from 'react';
import { PageComponentProps } from 'client/shared/types';

import './Home.css';

export const Home: React.FC<PageComponentProps> = React.memo(({ title }) => (
    <div className="home">{title}</div>
));
