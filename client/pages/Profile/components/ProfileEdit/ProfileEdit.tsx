import React, { useMemo } from 'react';
import { Grid, Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { ChangeProfileProps, CurrentUserInfoProps } from 'client/core/api';
import { BACK, GRID_SPACE, SAVE } from 'client/shared/consts';
import { InputControl, AvatarUpload } from 'client/shared/components';
import { Link } from 'react-router-dom';
import { ROUTES } from 'client/routing';
import { useSelector, useDispatch } from 'react-redux';
import { profileSelector } from 'client/core/store/selectors';
import { thunkEditProfile, thunkEditAvatar } from 'client/core/store';
import { PROFILE_EDIT_CONTROLS } from './ProfileEdit.config';

export const ProfileEdit: React.FC = React.memo(() => {
    const profile = useSelector(profileSelector);
    const dispatch = useDispatch();

    const {
        control,
        handleSubmit,
        errors,
    } = useForm<CurrentUserInfoProps>({ defaultValues: profile });

    const onSubmit = async (data: ChangeProfileProps) => dispatch(thunkEditProfile(data));

    const onChangeAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { files },
        } = e;
        const blob = files?.item(0);
        if (!blob) return;
        const formData = new FormData();
        formData.append('avatar', blob);

        dispatch(thunkEditAvatar(formData));
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
                        onChange={onChangeAvatar}
                        name="avatar"
                        src={profile.avatar}
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
