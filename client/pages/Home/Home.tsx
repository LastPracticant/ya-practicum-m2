import React, { useMemo } from 'react';
import { PageComponentProps } from 'client/shared/types';
import './Home.css';
import { ButtonsToolbar, NivelatorXY, Paper } from 'client/shared/components';
import {
    Button, Divider, List, ListItem, Avatar,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import bem from 'bem-cn';
import { LOCAL } from 'client/shared/consts';
import { ROUTES } from 'client/routing';
import { Link } from 'react-router-dom';
import { logoutThunk, profileSelector } from 'client/core/store';
import { CurrentUserInfoProps } from 'client/core/api';
import { withCheckAuth } from 'client/core/HOCs';

const block = bem('home');

const HomeComponent: React.FC<PageComponentProps> = React.memo(() => {
    const profile = useSelector(profileSelector) as CurrentUserInfoProps;
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutThunk());
    };

    const routes = [
        ROUTES.GAME_START,
        ROUTES.PROFILE,
        ROUTES.LEADERBOARD,
        ROUTES.FORUM,
    ];
    const controls = useMemo(
        () => routes.map((route) => (
                <ListItem key={route.title}>
                    <Link to={route.path}>{route.title}</Link>
                </ListItem>
        )),
        [],
    );

    return (
        <NivelatorXY className={block()}>
            <Paper className={block('paper')} sizes="small">
                <div className={block('userdata')}>
                    <Avatar src={profile.avatar} />
                    <p className={block('username')}>{profile.first_name}</p>
                    <p className={block('user-result')}>
                        {LOCAL.RECORD}: result
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
