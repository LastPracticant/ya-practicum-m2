import React, { useMemo } from 'react';
import { Grid, Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { ProfileAPI, ChangeProfileProps, CurrentUserInfoProps } from 'client/core/api';
import {
    CHANGE_PROFILE_DATA,
    CHANGE_PROFILE_PASSWORD,
    GRID_SPACE,
} from 'client/shared/consts';
import { InputControl, AvatarUpload } from 'client/shared/components';
import { Link } from 'react-router-dom';
import { PROFILE_FORM_CONTROLS } from './ProfileForm.config';

export const ProfileForm: React.FC = React.memo(() => {
    const { control, handleSubmit, errors, register } = useForm<CurrentUserInfoProps>();

    const onSubmit = (data: ChangeProfileProps) => {
        ProfileAPI.change(data);
    };

    const onChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { files },
        } = e;
        ProfileAPI.changeAvatar(files?.item(0));
    };

    const controls = useMemo(
        () =>
            PROFILE_FORM_CONTROLS.map((inputConfig) => {
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
                    <AvatarUpload
                        ref={register}
                        onChange={onChangeAvatar}
                        name="avatar"
                    />
                    {controls}
                </Grid>
                <Grid container item xs={12} justify="center" spacing={1}>
                    <Grid item>
                        <Button color="primary" type="submit">
                            {CHANGE_PROFILE_DATA}
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            component={Link}
                            to="/profile/password/"
                            color="primary"
                        >
                            {CHANGE_PROFILE_PASSWORD}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
});
