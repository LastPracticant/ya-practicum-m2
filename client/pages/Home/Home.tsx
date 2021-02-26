import React, { useMemo } from 'react';
import { PageComponentProps } from 'client/shared/types';
import './Home.css';
import { ButtonsToolbar, NivelatorXY, Paper } from 'client/shared/components';
import {
    Button, Divider, List, ListItem, Avatar,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import bem from 'bem-cn';
import { LOCAL } from 'client/shared/consts';
import { ROUTES } from 'client/routing';
import { Link, useHistory, withRouter } from 'react-router-dom';
import { thunkLogout } from 'client/core/store';
import { useAuth } from 'client/core/hooks';
import { HokAuth } from 'client/core/HOKs';

const block = bem('home');

export const HomeQ: React.FC<PageComponentProps> = React.memo((props: any) => {
    console.log(props);
    const dispatch = useDispatch();
    const history = useHistory();
    const { profile } = useAuth();

    if (!profile) return <div>dfss</div>;

    const handleLogout = () => {
        dispatch(thunkLogout());
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
            <Paper className={block('paper')} sizes="small">
                <div className={block('userdata')}>
                    <Avatar src={profile.avatar} />
                    <p className={block('username')}>{profile.first_name}</p>
                    <p className={block('user-result')}>{LOCAL.RECORD}: result</p>
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

export const Home = HokAuth(withRouter(HomeQ));
