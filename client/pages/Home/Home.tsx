import React, { useMemo } from 'react';
import { PageComponentProps } from 'client/shared/types';
import './Home.css';
import { ButtonsToolbar, NivelatorXY, Paper } from 'client/shared/components';
import {
    Button, Divider, List, ListItem, Avatar,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import {
    hideLoaderAction,
    showLoaderAction,
} from 'client/core/store/actions/loader.actions';
import bem from 'bem-cn';
import { RECORD, EXIT, AVATAR_DEFAULT } from 'client/shared/consts';
import { ROUTES } from 'client/routing';
import { Link, useHistory } from 'react-router-dom';
import { AuthAPI } from 'client/core/api';

const block = bem('home');

export const Home: React.FC<PageComponentProps> = React.memo(() => {
    const dispatch = useDispatch();
    const history = useHistory();

    /** TODO: просто для примера, потом убрать */
    const handleShowLoader = () => {
        dispatch(showLoaderAction());

        setTimeout(() => {
            dispatch(hideLoaderAction());
        }, 2000);
    };

    const handleLogout = () => {
        AuthAPI.logout();
        history.push(ROUTES.SIGNIN.path);
    };

    const routes = [ROUTES.GAME_START, ROUTES.PROFILE, ROUTES.LEADERBOARD, ROUTES.FORUM];
    const controls = useMemo(() => (
        routes.map((route) => (
            <ListItem key={route.title}>
                <Link to={route.path}>
                    {route.title}
                </Link>
            </ListItem>
        ))
    ), []);

    return (
        <NivelatorXY className={block()}>
            <Avatar>{AVATAR_DEFAULT}</Avatar>
            <Paper className={block('paper')} sizes="small">
                <div className={block('userdata')}>
                    <div className={block('avatar', { small: true })} />
                    <p className={block('username')}>username</p>
                    <p className={block('user-score')}>
                        {`${RECORD} : result`}
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
                        {EXIT}
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleShowLoader}
                    >
                        Показать лоадер
                    </Button>
                </ButtonsToolbar>
            </Paper>
        </NivelatorXY>
    );
});
