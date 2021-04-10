import './AddCommentForm.css';

import { AddCommentRequestProps } from 'client/core/api';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { GRID_SPACE, LOCAL } from 'client/shared/consts';
import { Button, Grid } from '@material-ui/core';
import { InputControl } from 'client/shared/components';
import bem from 'bem-cn';
import { FnActionProps } from 'client/shared/types';
import { useDispatch, useSelector } from 'react-redux';
import { addCommentThunk, profileSelector } from 'client/core/store';
import { ADD_COMMENT_FORM_CONTROLS } from './AddCommentForm.config';

const block = bem('add-comment-form');

interface AddCommentFormProps {
    closeModal: FnActionProps
    topicId?: string
    parentId?: number
}

export const AddCommentForm: React.FC<AddCommentFormProps> = React.memo(({
    closeModal,
    topicId,
    parentId,
}) => {
    const {
        control,
        handleSubmit,
        errors,
    } = useForm<AddCommentRequestProps>();

    const dispatch = useDispatch();
    const profile = useSelector(profileSelector);

    const onSubmit = (data: AddCommentRequestProps) => {
        if (!topicId) return;

        dispatch(addCommentThunk({
            ...data,
            parentId,
            userId: profile.id,
            topicId: Number(topicId),
        }));
        closeModal();
    };

    const controls = useMemo(
        () => ADD_COMMENT_FORM_CONTROLS.map((inputConfig) => {
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
        <form onSubmit={handleSubmit(onSubmit)} className={block()}>
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
