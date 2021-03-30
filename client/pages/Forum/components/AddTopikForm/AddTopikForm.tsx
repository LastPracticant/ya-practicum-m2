import { SigninProps } from 'client/core/api';
import React from 'react';
import { useForm } from 'react-hook-form';
import { LOCAL } from 'client/shared/consts';
import { Button } from '@material-ui/core';
// import { useDispatch } from 'react-redux';
// import { signinThunk } from 'client/core/store';

export const AddTopikForm: React.FC = React.memo(() => {
    const {
        // control,
        handleSubmit,
        // errors
    } = useForm<SigninProps>();
    // const dispatch = useDispatch();

    const onSubmit = (data: SigninProps) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Button color="primary" type="submit" variant="contained">
                {LOCAL.FORM_ADD}
            </Button>
        </form>
    );
});
