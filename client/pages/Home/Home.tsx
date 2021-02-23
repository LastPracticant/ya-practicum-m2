import React from 'react';
import { PageComponentProps } from 'client/shared/types';
import './Home.css';
import { ButtonsToolbar, NivelatorXY, Paper } from 'client/shared/components';
import { Button, Divider, List, ListItem } from '@material-ui/core';
import {
    useDispatch,
} from 'react-redux';
import { hideLoaderAction, showLoaderAction } from 'client/core/store/actions/loader.actions';
import bem from 'bem-cn';
import { RECORD, EXIT, LAST_PRACTICANT } from 'client/shared/consts';
import { ROUTES } from 'client/routing';
import { Link } from 'react-router-dom';


const block = bem('home');

export const Home: React.FC<PageComponentProps> = React.memo(() => {
    const dispatch = useDispatch();
    console.log(block("header"))

    /** TODO: просто для примера, потом убрать */
    const handleShowLoader = () => {
        dispatch(showLoaderAction());

        setTimeout(() => {
            dispatch(hideLoaderAction());
        }, 2000);
    };

    return (
        <NivelatorXY className={block()} >
            <h1 className={block('header')}>{ LAST_PRACTICANT }</h1>
            <Paper className={block('paper')} sizes="small">
                <div className={block('userdata')}>
                    <div className="home__avatar_small" />
                    <p className={block('username')}>username</p>
                    <p className={block('user-result')}>{RECORD}: result</p>
                </div>
                <Divider />
                <List className={block('navigation-items').toString()}>
                    <ListItem><Link to={ROUTES.GAME_START.path}>{ROUTES.GAME_START.title}</Link></ListItem>
                    <ListItem><Link to={ROUTES.PROFILE.path}>{ROUTES.PROFILE.title}</Link></ListItem>
                    <ListItem><Link to={ROUTES.LEADERBOARD.path}>{ROUTES.LEADERBOARD.title}</Link></ListItem>
                    <ListItem><Link to={ROUTES.FORUM.path}>{ROUTES.FORUM.title}</Link></ListItem>
                </List>
                <ButtonsToolbar justify="center">
                    <Button
                        variant="contained"
                        color="secondary"
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
    )
});
