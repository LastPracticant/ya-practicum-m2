import { InputControl } from 'client/shared/components';
import { AuthAPI, SignupProps } from 'client/core/api';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { SIGNUP_FORM_CONTROLS } from './SignupForm.config';

export const SignupForm: React.FC = React.memo(() => {
    const {
        register, handleSubmit, errors, setError,
    } = useForm<SignupProps>();

    const onSubmit = (data: SignupProps) => {
        if (data.password !== data.password_confirm) {
            setError('password_confirm', { type: 'manual' });
        } else {
            AuthAPI.signup(data);
        }
    };

    const controls = useMemo(() => SIGNUP_FORM_CONTROLS.map(({
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
            />
        );
    }), [errors]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {controls}

            <input type="submit" />
        </form>
    );
});
