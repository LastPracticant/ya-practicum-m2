import React from 'react';
import { ROUTES } from 'client/routing';
import bem from 'bem-cn';
import { List, ListItem, Link } from '@material-ui/core';

const block = bem('navigation');

export const Navigation: React.FC = React.memo(() => {
    const menuList = Object.keys(ROUTES).map((key) => (
        <ListItem button>
            <Link href={ROUTES[key].path}>{ROUTES[key].title}</Link>
        </ListItem>
    ));

    return (
        <List className={block('navigation-items').toString()}>{menuList}</List>
    );
});
