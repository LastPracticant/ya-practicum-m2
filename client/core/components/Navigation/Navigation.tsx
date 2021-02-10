import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { ROUTES, RouteValueProps } from 'routing';

const NavigationLink: React.FC<RouteValueProps> = ({ path, title }) => (
	<li><Link to={path}>{title}</Link></li>
);

export const Navigation: React.FC = React.memo(() => {
    const menuList = Object.keys(ROUTES).map((key) => (
	<NavigationLink
		key={ROUTES[key].title}
		path={ROUTES[key].path}
		title={ROUTES[key].title}
	/>
    ));

    return (
	<ul>
		{menuList}
	</ul>
    );
});
