import React from 'react';
import { FieldError } from 'react-hook-form';
import classnames from 'classnames';
import { ComponentCommonProps } from 'client/shared/types';

export interface InputControlProps extends ComponentCommonProps {
    name: string
    label?: string
    error?: FieldError
    errorMessage?: string
    type?: string
    required?: boolean
    pattern?: RegExp
}

const InputControlComponent = React.forwardRef<
HTMLInputElement, InputControlProps
>(({
    label,
    name,
    error,
    errorMessage = 'ошибка',
    type = 'text',
    className,
}, ref) => (
	<div
		className={classnames(
        'input-control',
        { 'input-control_error': error },
        className,
		)}
	>
		<div>
			<label htmlFor={name}>{label}</label>
		</div>
		<input
			name={name}
			placeholder={label}
			ref={ref}
			id={name}
			type={type}
		/>
		<p>{error && errorMessage}</p>
	</div>
));

export const InputControl = React.memo(InputControlComponent);
