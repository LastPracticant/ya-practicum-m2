import { Signup } from 'pages/Signup';
import React from 'react';
import {
    BrowserRouter,
    Route,
    Switch,
    Link,
} from 'react-router-dom';

import './App.css';

export const App: React.FC = () => (
	<BrowserRouter>
		<div>
			<Switch>
				<Route exact path="/">
					<Signup />
				</Route>

				<Route exact path="/">
					home
				</Route>

				<Route path="/users">
					users
				</Route>

				<Route path="/about">
					about
				</Route>
			</Switch>
		</div>

		<ul>
			<li><Link to="/">home</Link></li>
			<li><Link to="/users">users</Link></li>
			<li><Link to="/about">about</Link></li>
		</ul>
	</BrowserRouter>
);
