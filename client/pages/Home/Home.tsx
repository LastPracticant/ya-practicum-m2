import './Home.css';

import React, { useMemo } from 'react';
import { PageComponentProps } from 'client/shared/types';
import { ButtonsToolbar, NivelatorXY, Paper } from 'client/shared/components';
import {
    Button, Divider, Link, List, ListItem,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import bem from 'bem-cn';
import { LOCAL } from 'client/shared/consts';
import { ROUTES } from 'client/routing';
import { Link as RouterLink } from 'react-router-dom';

import { logoutThunk, profileSelector } from 'client/core/store';
import { withCheckAuth } from 'client/core/HOCs';
import { Meta, Logo } from 'client/core';

const block = bem('home');

const HomeComponent: React.FC<PageComponentProps> = React.memo(({ title }) => {
    const profile = useSelector(profileSelector);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutThunk());
    };

    const routes = [
        ROUTES.GAME_START,
        ROUTES.PROFILE,
        ROUTES.LEADERBOARD,
        ROUTES.FORUM,
        ROUTES.SETTINGS,
    ];
    const controls = useMemo(
        () => routes.map((route) => (
            <ListItem key={route.title}>
                <Link
                    to={route.path}
                    component={RouterLink}
                >
                    {route.title}
                </Link>
            </ListItem>
        )),
        [],
    );

    return (
        <NivelatorXY className={block()}>
            <Meta title={title} />
            <Logo />
            <Paper className={block('paper')} sizes="small">
                <div className={block('userdata')}>
                    <p className={block('username')}>{profile.first_name}</p>
                    <p className={block('user-result')}>
                        {/* TODO: будет доработано, когда реализуем АПИ для leaderboard, LP-82 */}
                        {LOCAL.RECORD}: 33
                    </p>
                </div>
                <Divider />
                <List className={block('navigation-items').toString()}>
                    {controls}
                </List>
                <ButtonsToolbar justify="center">
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleLogout}
                    >
                        {LOCAL.EXIT}
                    </Button>
                </ButtonsToolbar>
            </Paper>
        </NivelatorXY>
    );
});

export const Home = withCheckAuth(HomeComponent);
