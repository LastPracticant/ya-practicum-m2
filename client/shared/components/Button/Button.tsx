import React, { FC, memo } from 'react'
import { createUseStyles } from 'react-jss'
import { Theme } from 'SharedStyles/theme'
import { Typography, IconProps } from '../index'

const useStyles = createUseStyles({
    'YlpButton-root': {
        padding: Theme.space(2),
        borderRadius: Theme.radius,
        boxSizing: 'border-box',
        cursor: 'pointer',
        outline: 'none',
        transition: '0.5s',
        background: 'transparent',
        height: '100%'
    },
    text: {
        border: '0px',
        color: Theme.colors.primary,
        '&:hover': {
            backgroundColor: 'rgba(244, 143, 177, 0.3)'
        }
    },
    outlined: {
        border: '1px solid rgba(244, 143, 177, 0.5)',
        color: Theme.colors.primary,
        '&:hover': {
            backgroundColor: 'rgba(244, 143, 177, 0.3)'
        }
    },
    contained: {
        border: '0px',
        backgroundColor: Theme.colors.primary,
        '&:hover': {
            backgroundColor: Theme.colors.dark
        }
    },
    btnIcon: {
        display: 'flex',
        alignItems: 'center'
    },
    btnCircle: {
        borderRadius: '100%'
    }
})

interface ButtonProps {
    variant?: 'text' | 'outlined' | 'contained'
    style?: React.CSSProperties
    icon?: React.FC<IconProps>
    text?: string
    onClick?:
        | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
        | undefined
    isCircle?: boolean
}

export const Button: FC<ButtonProps> = memo(
    ({
        children,
        style,
        variant = 'contained',
        onClick,
        icon = null,
        isCircle = false
    }) => {
        const classes = useStyles()
        return (
            <button
                className={[
                    classes['YlpButton-root'],
                    classes[variant],
                    classes[icon && 'btnIcon'],
                    classes[isCircle && 'btnCircle']
                ].join(' ')}
                style={style}
                onClick={onClick}
            >
                <Typography variant='body'>{children}</Typography>
                {icon}
            </button>
        )
    }
)
