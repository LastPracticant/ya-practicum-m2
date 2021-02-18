import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { ProfileAPI } from 'client/core/api';
import {
    CHANGE_PROFILE_DATA,
    CHANGE_PROFILE_PASSWORD,
} from 'client/shared/consts';
import { InputControl, InputAvatar } from 'client/shared/components';
import { PROFILE_FORM_CONTROLS } from './ProfileForm.config';

export const ProfileForm: React.FC = React.memo(() => {
    const { control, handleSubmit, errors, register } = useForm();

    const onSubmit = (data: any) => {
        ProfileAPI.change(data);
    };

    const onChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { files },
        } = e;
        ProfileAPI.changeAvatar(files?.item(0));
    };

    const controls = () => {
        const result = PROFILE_FORM_CONTROLS.map((configInput) => {
            const { name, type } = configInput;
            const error = errors[name as keyof typeof errors]?.message;
            if (type !== 'password') {
                return (
                    <InputControl
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        error={error}
                        control={control}
                        {...configInput}
                    />
                );
            }
        });
        return result;
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="profile_form">
            <Grid container spacing={2}>
                <Grid
                    item
                    xs={12}
                    container
                    direction="column"
                    alignItems="center"
                >
                    <InputAvatar
                        ref={register}
                        onChange={onChangeAvatar}
                        name="avatar"
                    />
                    {controls()}
                </Grid>
                <Grid container item xs={12} justify="center" spacing={1}>
                    <Grid item>
                        <Button color="primary" type="submit">
                            {CHANGE_PROFILE_DATA}
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            color="primary"
                            href="/profile/password"
                        >
                            {CHANGE_PROFILE_PASSWORD}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
});
