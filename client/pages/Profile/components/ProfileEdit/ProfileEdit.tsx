import React, { useMemo, useCallback, useEffect } from 'react';
import { Grid, Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { ChangeProfileProps, CurrentUserInfoProps } from 'client/core/api';
import { GRID_SPACE, LOCAL } from 'client/shared/consts';
import { InputControl, AvatarUpload } from 'client/shared/components';
import { Link } from 'react-router-dom';
import { ROUTES } from 'client/routing';
import { useSelector, useDispatch } from 'react-redux';
import { profileSelector } from 'client/core/store/selectors';
import { editProfileThunk, editAvatarThunk } from 'client/core/store';
import { PROFILE_EDIT_CONTROLS } from './ProfileEdit.config';

export const ProfileEdit: React.FC = React.memo(() => {
    const profile = useSelector(profileSelector);
    const dispatch = useDispatch();

    const {
        control,
        handleSubmit,
        errors,
        reset,
    } = useForm<CurrentUserInfoProps>();

    const onSubmit = (data: ChangeProfileProps) => dispatch(editProfileThunk(data));

    const onChangeAvatar = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const blob = e.target.files?.item(0);

        if (!blob) {
            return;
        }

        const formData = new FormData();

        formData.append('avatar', blob);
        dispatch(editAvatarThunk(formData));
    }, []);

    const controls = useMemo(
        () => PROFILE_EDIT_CONTROLS.map((inputConfig) => {
            const { name } = inputConfig;
            const error = errors[name as keyof typeof errors]?.message;
            return (
                <InputControl
                    key={name}
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

    useEffect(() => {
        reset(profile);
    }, [profile]);

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
                        onChange={onChangeAvatar}
                        name="avatar"
                        src={profile?.avatar}
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
                            {LOCAL.SAVE}
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            component={Link}
                            to={ROUTES.PROFILE.path}
                            color="primary"
                        >
                            {LOCAL.BACK}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
});
