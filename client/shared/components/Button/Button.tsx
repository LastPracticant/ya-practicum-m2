import React, { FC, memo, ReactNode } from 'react'
import classnames from 'classnames'
import './Button.css'
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'text' | 'outlined' | 'contained'
    icon?: ReactNode
    text?: string
    isCircle?: boolean
}

export const Button: FC<ButtonProps> = memo(
    ({
        icon = null,
        variant = 'contained',
        isCircle = false,
        children,
        type,
        className,
        ...props
    }) => (
        <button
            className={classnames(
                'button',
                `type_${variant}`,
                { button_circle: isCircle },
                { 'button_with-icon': icon },
                className
            )}
            type={type}
            {...props}
        >
            <p>{children}</p>
            {icon}
        </button>
    )
)
