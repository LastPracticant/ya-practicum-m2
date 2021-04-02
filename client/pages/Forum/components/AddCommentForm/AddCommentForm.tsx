import './AddCommentForm.css';

import { SigninProps } from 'client/core/api';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { GRID_SPACE, LOCAL } from 'client/shared/consts';
import { Button, Grid } from '@material-ui/core';
import { InputControl } from 'client/shared/components';
import bem from 'bem-cn';
import { ADD_COMMENT_FORM_CONTROLS } from './AddCommentForm.config';

const block = bem('add-comment-form');

interface AddCommentFormProps {
    parentId?: number
}

export const AddCommentForm: React.FC<AddCommentFormProps> = React.memo(({
    parentId,
}) => {
    // TODO: контракт будет реализован тут LP-110 (как заглушка пока SigninProps)
    const {
        control,
        handleSubmit,
        errors,
    } = useForm<SigninProps>();

    // TODO: контракт будет реализован тут LP-110 (как заглушка пока SigninProps)
    const onSubmit = (data: SigninProps) => {
        console.log({ ...data, parentId });
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
