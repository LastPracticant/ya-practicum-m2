import React from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import { TextField, OutlinedTextFieldProps } from '@material-ui/core';
import { PatternProps, CHECK_REQUIRED } from 'client/shared/consts';

export interface InputControlProps extends OutlinedTextFieldProps {
    name: string;
    label: string;
    control?: Control;
    pattern?: PatternProps;
    type?: string;
}

export const InputControl: React.FC<InputControlProps> = React.memo(
    ({
        name, control, type = 'text', error, required, pattern, ...props
    }) => {
        const rules: RegisterOptions = {
            required: required && CHECK_REQUIRED,
            pattern,
        };
        return (
            <Controller
                name={name}
                control={control}
                defaultValue=""
                rules={rules}
                render={({ onChange, value }) => (
                    <TextField
                        type={type}
                        onChange={onChange}
                        value={value}
                        {...props}
                    />
                )}
            />
        );
    },
);
