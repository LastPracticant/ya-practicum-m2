import React, { useMemo } from 'react';
import { Grid, Button, Avatar } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { CurrentUserInfoProps, API_HOST, AuthAPI } from 'client/core/api';
import {
    CHANGE_PROFILE_DATA,
    CHANGE_PROFILE_PASSWORD,
    GRID_SPACE,
    AVATAR_DEFAULT,
} from 'client/shared/consts';
import { InputControl } from 'client/shared/components';
import { Link } from 'react-router-dom';
import { ROUTES } from 'client/routing';
import { PROFILE_FORM_CONTROLS } from './ProfileForm.config';

export const ProfileForm: React.FC = React.memo(() => {
    const { control, setValue } = useForm<CurrentUserInfoProps>();

    const [avatar, setAvatar] = React.useState('');

    const updateForm = async () => {
        const data = await AuthAPI.getCurrentUserInfo();

        Object.entries(data).forEach(([name, value]) => {
            if (name !== 'avatar') {
                setValue(name as keyof CurrentUserInfoProps, value);
            } else setAvatar(API_HOST + value);
        });
    };

    setTimeout(() => updateForm(), []);

    const controls = useMemo(
        () =>
            PROFILE_FORM_CONTROLS.map((inputConfig) => (
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
        [],
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
                    <Avatar src={avatar}>{AVATAR_DEFAULT}</Avatar>
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
