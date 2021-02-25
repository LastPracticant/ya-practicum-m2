import { InputControl } from 'client/shared/components';
import { AuthAPI, SignupProps } from 'client/core/api';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { LOCAL, GRID_SPACE } from 'client/shared/consts';
import { Button, Grid } from '@material-ui/core';
import { SIGNUP_FORM_CONTROLS } from './SignupForm.config';

export const SignupForm: React.FC = React.memo(() => {
    const {
        control,
        handleSubmit,
        errors,
        setError,
    } = useForm<SignupProps>();

    const onSubmit = (data: SignupProps) => {
        if (data.password !== data.password_confirm) {
            setError('password_confirm', { type: 'manual' });
        } else {
            AuthAPI.signup(data);
        }
    };

    const controls = useMemo(
        () => SIGNUP_FORM_CONTROLS.map((inputConfig) => {
            const { name } = inputConfig;
            const error = errors[name as keyof typeof errors]?.message;
            return (
                    <InputControl
                        key={name}
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
                    <Button color="primary" type="submit" variant="contained">
                        {LOCAL.REGISTER}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
});
