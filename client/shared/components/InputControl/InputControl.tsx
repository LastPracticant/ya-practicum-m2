import React from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import { TextField, TextFieldProps } from '@material-ui/core';
import { PatternProps, CHECK_REQUIRED } from 'client/shared/consts';

export interface InputControlProps extends TextFieldProps {
    name: string;
    label: string;
    control?: Control;
    pattern?: PatternProps;
    type?: string;
    error?: string;
    required?: boolean;
}

export const InputControl: React.FC<InputControlProps> = React.memo(
    ({
        name, control, type = 'text', error, required, pattern, ...props
    }) => {
        const rules: RegisterOptions = {};
        if (required) {
            rules.required = CHECK_REQUIRED;
        }
        if (pattern) {
            rules.pattern = pattern;
        }
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
                        error={Boolean(error)}
                        helperText={error}
                        {...props}
                    />
                )}
            />
        );
    },
);
