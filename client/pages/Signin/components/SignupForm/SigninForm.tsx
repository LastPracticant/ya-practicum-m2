import { InputControl } from 'client/shared/components';
import { AuthAPI, SigninProps } from 'client/core/api';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ROUTES } from 'client/routing';
import { AUTHORIZE, NO_ACCOUNT } from 'client/shared/consts';
import { Button } from '@material-ui/core';
import { SIGNIN_FORM_CONTROLS } from './SigninForm.config';

export const SigninForm: React.FC = React.memo(() => {
    const {
        register, handleSubmit, errors,
    } = useForm<SigninProps>();

    const onSubmit = (data: SigninProps) => {
        AuthAPI.signin(data);
    };

    const controls = useMemo(() => SIGNIN_FORM_CONTROLS.map(({
        name,
        required,
        label,
        errorMessage,
        pattern,
    }) => {
        const fieldName = name as keyof typeof errors;

        return (
            <InputControl
                key={name}
                name={name}
                label={label}
                ref={register({ required, pattern })}
                error={errors[fieldName]}
                errorMessage={errorMessage}
                className="form-input_primary"
            />
        );
    }), [errors]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {controls}

            <Button type="submit" variant="outlined" className="btn btn_primary btn_wide">
                {AUTHORIZE}
            </Button>
            <Link to={ROUTES.SIGNUP.path} className="btn btn_link">{NO_ACCOUNT}</Link>
        </form>
    );
});
