import React from 'react';
import { Grid, Button, Avatar } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { ProfileAPI, ChangePasswordProps } from 'client/core/api';
import {
    CHANGE_PROFILE_PASSWORD,
    BACK,
    GRID_SPACE,
    AVATAR_DEFAULT,
} from 'client/shared/consts';
import { InputControl } from 'client/shared/components';
import { Link } from 'react-router-dom';
import { PROFILE_PASSWORD_CONTROLS } from './ProfilePassword.config';

export const ProfilePassword: React.FC = React.memo(() => {
    const { control, handleSubmit, errors } = useForm<ChangePasswordProps>();

    const onSubmit = (data: ChangePasswordProps) => {
        ProfileAPI.changePassword(data);
    };

    const controls = React.useMemo(
        () =>
            PROFILE_PASSWORD_CONTROLS.map((inputConfig) => {
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
        <form onSubmit={handleSubmit(onSubmit)} className="profile_form">
            <Grid container spacing={GRID_SPACE}>
                <Grid
                    item
                    xs={12}
                    container
                    direction="column"
                    alignItems="center"
                >
                    <Avatar className="avatar-upload" src={'src'}>
                        {AVATAR_DEFAULT}
                    </Avatar>
                    {controls}
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
