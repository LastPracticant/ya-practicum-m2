import React from 'react';
import { PageComponentProps } from 'client/shared/types';

import './Home.css';
import { Paper } from 'client/shared/components';
import { Button, Grid } from '@material-ui/core';
import { Navigation } from 'client/core';
import {
    useDispatch,
} from 'react-redux';
import { hideLoaderAction, showLoaderAction } from 'client/core/store/actions/loader.actions';
import bem from 'bem-cn';

const block = bem('home');

export const Home: React.FC<PageComponentProps> = React.memo(() => {
    const dispatch = useDispatch();

    /** TODO: просто для примера, потом убрать */
    const handleShowLoader = () => {
        dispatch(showLoaderAction());

        setTimeout(() => {
            dispatch(hideLoaderAction());
        }, 2000);
    };

    return (
        <Grid
            className={block()}
            container
            justify="center"
            alignItems="center"
        >
            <Paper sizes="small">
                <Navigation />

                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleShowLoader}
                >
                    Показать лоадер
                </Button>
            </Paper>
        </Grid>
    );
});
