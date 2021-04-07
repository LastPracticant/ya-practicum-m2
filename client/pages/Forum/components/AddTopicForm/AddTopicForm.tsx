import { AddTopicRequestProps } from 'client/core/api';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { GRID_SPACE, LOCAL } from 'client/shared/consts';
import { Button, Grid } from '@material-ui/core';
import { InputControl } from 'client/shared/components';
import { useDispatch, useSelector } from 'react-redux';
import { addTopicThunk, profileSelector } from 'client/core/store';
import { FnActionProps } from 'client/shared/types';
import { ADD_TOPIC_FORM_CONTROLS } from './AddTopicForm.config';

interface AddTopicFormProps {
    closeModal: FnActionProps
}

export const AddTopicForm: React.FC<AddTopicFormProps> = React.memo(({
    closeModal,
}) => {
    const {
        control,
        handleSubmit,
        errors,
    } = useForm<AddTopicRequestProps>();

    const dispatch = useDispatch();
    const profile = useSelector(profileSelector);

    const onSubmit = (data: AddTopicRequestProps) => {
        dispatch(addTopicThunk({ ...data, userId: profile.id }));
        closeModal();
    };

    const controls = useMemo(
        () => ADD_TOPIC_FORM_CONTROLS.map((inputConfig) => {
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
                            {LOCAL.COMMON_PREFIXES.ADD}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
});
