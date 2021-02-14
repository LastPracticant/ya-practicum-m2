import React, { FC, memo, ReactNode } from 'react';
import { createUseStyles } from 'react-jss';
import { Theme } from 'SharedStyles/theme';
import { Typography } from 'SharedComponents';
import classnames from 'classnames';

const useStyles = createUseStyles({
    'YlpButton-root': {
        padding: Theme.space(2),
        borderRadius: Theme.radius,
        boxSizing: 'border-box',
        cursor: 'pointer',
        outline: 'none',
        transition: '0.5s',
        background: 'transparent',
        height: '100%',
    },
    text: {
        border: '0px',
        color: Theme.colors.primary,
        '&:hover': {
            backgroundColor: 'rgba(244, 143, 177, 0.3)',
        },
    },
    outlined: {
        border: '1px solid rgba(244, 143, 177, 0.5)',
        color: Theme.colors.primary,
        '&:hover': {
            backgroundColor: 'rgba(244, 143, 177, 0.3)',
        },
    },
    contained: {
        border: '0px',
        backgroundColor: Theme.colors.primary,
        '&:hover': {
            backgroundColor: Theme.colors.dark,
        },
    },
    btnIcon: {
        display: 'flex',
        alignItems: 'center',
    },
    btnCircle: {
        borderRadius: '100%',
    },
});

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'text' | 'outlined' | 'contained'
    icon?: ReactNode,
    text?: string,
    isCircle?: boolean
}

export const Button: FC<ButtonProps> = memo(
    ({
        icon = null,
        variant = 'contained',
        isCircle = false,
        onClick,
        children,
        style,
        type = 'button',
        className,
    }) => {
        const classes = useStyles();
        return (
            <button
                type={type}
                className={classnames(
                    classes['YlpButton-root'],
                    classes[variant],
                    classes[icon && 'btnIcon'],
                    classes[isCircle && 'btnCircle'],
                    className,
                )}
                style={style}
                onClick={onClick}
            >
                <Typography variant="body">{children}</Typography>
                {icon}
            </button>
        );
    },
);
