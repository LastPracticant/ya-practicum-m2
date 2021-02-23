import React from 'react';
import { Grid, Button, Avatar } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { ProfileAPI, ChangePasswordProps } from 'client/core/api';
import {
    BACK, GRID_SPACE, AVATAR_DEFAULT, SAVE,
} from 'client/shared/consts';
import { InputControl } from 'client/shared/components';
import { Link } from 'react-router-dom';
import { ROUTES } from 'client/routing';
import { PROFILE_PASSWORD_CONTROLS } from './ProfilePassword.config';

export const ProfilePassword: React.FC = React.memo(() => {
    const { control, handleSubmit, errors } = useForm<ChangePasswordProps>();

    const onSubmit = (data: ChangePasswordProps) => {
        ProfileAPI.changePassword(data);
    };

    const controls = React.useMemo(
        () => PROFILE_PASSWORD_CONTROLS.map((inputConfig) => {
            const { name } = inputConfig;
            const error = errors[name as keyof typeof errors]?.message;
            return (
                    <InputControl
                        fullWidth
                        margin="dense"
                        error={Boolean(error)}
                        helperText={error}
                        control={control}
                        variant="outlined"
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
                    <Avatar className="avatar-upload">{AVATAR_DEFAULT}</Avatar>
                    {controls}
                </Grid>
                <Grid container item xs={12} justify="center" spacing={1}>
                    <Grid item>
                        <Button color="primary" type="submit">
                            {SAVE}
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            component={Link}
                            to={ROUTES.PROFILE.path}
                            color="primary"
                        >
                            {BACK}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
});
