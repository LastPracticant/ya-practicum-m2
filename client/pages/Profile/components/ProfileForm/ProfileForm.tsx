import React, { useMemo } from 'react';
import { Grid, Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import {
    ProfileAPI,
    ChangeProfileProps,
    CurrentUserInfoProps,
    API_HOST,
    AuthAPI,
} from 'client/core/api';
import {
    CHANGE_PROFILE_DATA,
    CHANGE_PROFILE_PASSWORD,
    GRID_SPACE,
} from 'client/shared/consts';
import { InputControl, AvatarUpload } from 'client/shared/components';
import { Link } from 'react-router-dom';
import { ROUTES } from 'client/routing';
import { PROFILE_FORM_CONTROLS } from './ProfileForm.config';

export const ProfileForm: React.FC = React.memo(() => {
    const {
        control, handleSubmit, errors, register, setValue,
    } = useForm<
    CurrentUserInfoProps
    >();

    const [avatar, setAvatar] = React.useState('');

    const updateForm = (data: CurrentUserInfoProps) => {
        Object.entries(data).forEach(([name, value]) => {
            if (name !== 'avatar') {
                setValue(name as keyof CurrentUserInfoProps, value);
            } else setAvatar(API_HOST + value);
        });
    };

    const onSubmit = async (data: ChangeProfileProps) => {
        await ProfileAPI.change(data);

        const result = await AuthAPI.getCurrentUserInfo();
        updateForm((result as unknown) as CurrentUserInfoProps);
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

        const result = await AuthAPI.getCurrentUserInfo();
        updateForm((result as unknown) as CurrentUserInfoProps);
    };

    const controls = useMemo(
        () => PROFILE_FORM_CONTROLS.map((inputConfig) => {
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
                        <Button color="primary" type="submit">
                            {CHANGE_PROFILE_DATA}
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            component={Link}
                            to={ROUTES.PROFILE_PASSWORD.path}
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
