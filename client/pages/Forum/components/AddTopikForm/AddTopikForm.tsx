import { SigninProps } from 'client/core/api';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { GRID_SPACE, LOCAL } from 'client/shared/consts';
import { Button, Grid } from '@material-ui/core';
import { InputControl } from 'client/shared/components';
import { ADD_TOPIK_FORM_CONTROLS } from './AddTopikForm.config';

export const AddTopikForm: React.FC = React.memo(() => {
    const {
        control,
        handleSubmit,
        errors,
    } = useForm<SigninProps>();

    const onSubmit = (data: SigninProps) => {
        console.log(data);
    };

    const controls = useMemo(
        () => ADD_TOPIK_FORM_CONTROLS.map((inputConfig) => {
            const { name } = inputConfig;
            const error = errors[name as keyof typeof errors]?.message;

            return (
                    <InputControl
                        key={name}
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={GRID_SPACE}>
                <Grid
                    item
                    xs={12}
                    container
                    direction="column"
                    alignItems="center"
                >
                    {controls}
                </Grid>
                <Grid container item xs={12} justify="center" spacing={1}>
                    <Grid item>
                        <Button color="primary" type="submit">
                            {LOCAL.COMMON_PREFIX.ADD}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
});
