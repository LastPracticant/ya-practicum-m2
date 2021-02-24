import React, { useMemo, useEffect } from 'react';
import { Grid, Button, Avatar } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { CurrentUserInfoProps } from 'client/core/api';
import {
    CHANGE_PROFILE_DATA,
    CHANGE_PROFILE_PASSWORD,
    GRID_SPACE,
    AVATAR_DEFAULT,
} from 'client/shared/consts';
import { InputControl } from 'client/shared/components';
import { Link } from 'react-router-dom';
import { ROUTES } from 'client/routing';
import { profileSelector } from 'client/core/store/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { thunkCurrentUserInfo } from 'client/core/store';
import { PROFILE_FORM_CONTROLS } from './ProfileForm.config';

export const ProfileForm: React.FC = React.memo(() => {
    const profile = useSelector(profileSelector);
    const dispatch = useDispatch();

    const { control, reset } = useForm<CurrentUserInfoProps>();

    useEffect(() => {
        if (profile.id === -1) dispatch(thunkCurrentUserInfo());
    }, []);

    useEffect(() => reset(profile), [profile]);

    const controls = useMemo(
        () => PROFILE_FORM_CONTROLS.map((inputConfig) => (
                <InputControl
                    disabled
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    error={false}
                    helperText=""
                    control={control}
                    {...inputConfig}
                />
        )),
        [profile],
    );

    return (
        <form className="profile_form">
            <Grid container spacing={GRID_SPACE}>
                <Grid
                    item
                    xs={12}
                    container
                    direction="column"
                    alignItems="center"
                >
                    <Avatar src={profile.avatar}>{AVATAR_DEFAULT}</Avatar>
                    {controls}
                </Grid>
                <Grid container item xs={12} justify="center" spacing={1}>
                    <Grid item>
                        <Button
                            component={Link}
                            to={ROUTES.PROFILE_DATA.path}
                            color="primary"
                        >
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
