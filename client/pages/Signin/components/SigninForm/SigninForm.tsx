import { InputControl } from 'client/shared/components';
import { SigninProps } from 'client/core/api';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ROUTES } from 'client/routing';
import { AUTHORIZE, NO_ACCOUNT, GRID_SPACE } from 'client/shared/consts';
import { Button, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { thunkLogin } from 'client/core/store';
import { SIGNIN_FORM_CONTROLS } from './SigninForm.config';

export const SigninForm: React.FC = React.memo(() => {
    const { control, handleSubmit, errors } = useForm<SigninProps>();
    const dispatch = useDispatch();

    const onSubmit = (data: SigninProps) => {
        dispatch(thunkLogin(data));
    };

    const controls = useMemo(
        () => SIGNIN_FORM_CONTROLS.map((inputConfig) => {
            const { name } = inputConfig;
            const error = errors[name as keyof typeof errors]?.message;
            return (
                    <InputControl
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        error={Boolean(error)}
                        helperText={error}
                        control={control}
                        {...inputConfig}
                    />
            );
        }),
        [errors],
    );

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={GRID_SPACE}>
                <Grid
                    item
                    xs={12}
                    container
                    direction="column"
                    alignItems="center"
                >
                    {controls}
                </Grid>
                <Grid container item xs={12} justify="center" spacing={1}>
                    <Grid item>
                        <Button color="primary" type="submit" variant="contained">
                            {AUTHORIZE}
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            component={Link}
                            to={ROUTES.SIGNUP.path}
                            color="primary"
                        >
                            {NO_ACCOUNT}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
});
