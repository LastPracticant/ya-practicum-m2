import './App.css';

import React from 'react';
import {
    BrowserRouter,
} from 'react-router-dom';
import { Routing } from 'client/routing/Routing';
import { Navigation } from 'client/core/components';

export const App: React.FC = () => (
	<BrowserRouter>
		<Navigation />
		<Routing />
	</BrowserRouter>
);
