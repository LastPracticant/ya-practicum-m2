import React from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import { TextField, OutlinedTextFieldProps } from '@material-ui/core';
import { PatternProps, CHECK_REQUIRED } from 'client/shared/consts';

export interface InputControlProps {
    name: string;
    label: string;
    control?: Control;
    pattern?: PatternProps;
    type?: string;
    required?: boolean;
}

export const InputControl: React.FC<InputControlProps &
OutlinedTextFieldProps> = React.memo(
    ({
        name, control, type = 'text', required, pattern, ...props
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
