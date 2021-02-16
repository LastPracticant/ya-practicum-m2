import React from 'react';

import './App.css';
import './shared/styles/theme.css';

import {
    BrowserRouter,
} from 'react-router-dom';
import { Routing } from 'client/routing/Routing';

export const App: React.FC = () => (
	<BrowserRouter>
		<Routing />
	</BrowserRouter>
);
