import React, { useMemo } from 'react';
import { Grid, Button, Avatar } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { CurrentUserInfoProps } from 'client/core/api';
import {
    GRID_SPACE,
    LOCAL,
} from 'client/shared/consts';
import { InputControl } from 'client/shared/components';
import { Link, Redirect } from 'react-router-dom';
import { ROUTES } from 'client/routing';
import { profileSelector } from 'client/core/store/selectors';
import { useSelector } from 'react-redux';
import { PROFILE_FORM_CONTROLS } from './ProfileForm.config';

export const ProfileForm: React.FC = React.memo(() => {
    const profile = useSelector(profileSelector);

    if (!profile) {
        return <Redirect to={ROUTES.SIGNIN.path} />;
    }

    const { control } = useForm<CurrentUserInfoProps>({ defaultValues: profile });

    const controls = useMemo(
        () => PROFILE_FORM_CONTROLS.map((inputConfig) => (
                <InputControl
                    key={inputConfig.name}
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
                    <Avatar src={profile?.avatar}>{LOCAL.AVATAR_DEFAULT}</Avatar>
                    {controls}
                </Grid>
                <Grid container item xs={12} justify="center" spacing={1}>
                    <Grid item>
                        <Button
                            component={Link}
                            to={ROUTES.PROFILE_DATA.path}
                            color="primary"
                        >
                            {LOCAL.CHANGE_PROFILE_DATA}
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            component={Link}
                            to={ROUTES.PROFILE_PASSWORD.path}
                            color="primary"
                        >
                            {LOCAL.CHANGE_PROFILE_PASSWORD}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
});
