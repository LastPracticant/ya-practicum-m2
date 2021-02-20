import React from 'react';
import { Grid, Button, Avatar } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { ProfileAPI } from 'client/core/api';
import { CHANGE_PROFILE_PASSWORD, BACK } from 'client/shared/consts';
import { InputControl } from 'client/shared/components';
import { Link } from 'react-router-dom';
import { PROFILE_PASSWORD_CONTROLS } from './ProfilePassword.config';

export const ProfilePassword: React.FC = React.memo(() => {
    const { control, handleSubmit, errors } = useForm();

    const onSubmit = (data: any) => {
        ProfileAPI.changePassword(data);
    };

    const controls = () => {
        const result = PROFILE_PASSWORD_CONTROLS.map((configInput) => {
            const { name } = configInput;
            const error = errors[name as keyof typeof errors]?.message;
            return (
                <InputControl
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    error={error}
                    control={control}
                    {...configInput}
                />
            );
        });
        return result;
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="profile_form">
            <Grid container spacing={2}>
                <Grid
                    item
                    xs={12}
                    container
                    direction="column"
                    alignItems="center"
                >
                    <Avatar className="avatar-upload" src={'src'}>
                        PR
                    </Avatar>
                    {controls()}
                </Grid>
                <Grid container item xs={12} justify="center" spacing={1}>
                    <Grid item>
                        <Button color="primary" type="submit">
                            {CHANGE_PROFILE_PASSWORD}
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button component={Link} to="/profile/" color="primary">
                            {BACK}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
});
