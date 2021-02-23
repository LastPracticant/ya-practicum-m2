import React, { useMemo, useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import {
    ProfileAPI,
    ChangeProfileProps,
    CurrentUserInfoProps,
    API_HOST,
    AuthAPI,
} from 'client/core/api';
import { BACK, GRID_SPACE, SAVE } from 'client/shared/consts';
import { InputControl, AvatarUpload } from 'client/shared/components';
import { Link } from 'react-router-dom';
import { ROUTES } from 'client/routing';
import { PROFILE_EDIT_CONTROLS } from './ProfileEdit.config';

export const ProfileEdit: React.FC = React.memo(() => {
    const {
        control,
        handleSubmit,
        errors,
        register,
        reset,
    } = useForm<CurrentUserInfoProps>();

    const [avatar, setAvatar] = useState('');

    const updateForm = async () => {
        const data = await AuthAPI.getCurrentUserInfo();

        setAvatar(API_HOST + data.avatar);
        delete data.avatar;
        reset(data);
    };

    const onSubmit = async (data: ChangeProfileProps) => {
        await ProfileAPI.change(data);

        updateForm();
    };

    const onChangeAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { files },
        } = e;
        const blob = files?.item(0);
        if (!blob) return;
        const formData = new FormData();
        formData.append('avatar', blob);

        await ProfileAPI.changeAvatar(formData);

        updateForm();
    };

    const controls = useMemo(
        () => PROFILE_EDIT_CONTROLS.map((inputConfig) => {
            const { name } = inputConfig;
            const error = errors[name as keyof typeof errors]?.message;
            return (
                    <InputControl
                        fullWidth
                        variant="outlined"
                        margin="dense"
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
                        src={avatar}
                    />
                    {controls}
                </Grid>
                <Grid container item xs={12} justify="center" spacing={1}>
                    <Grid item>
                        <Button
                            color="primary"
                            type="submit"
                            variant="contained"
                        >
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
