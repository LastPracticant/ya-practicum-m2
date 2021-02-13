import React, { FC, memo } from 'react'
import { createUseStyles } from 'react-jss'
// import Theme from '../../styles/theme/Theme'
import Theme from 'SharedStyles/theme/Theme'
import { Typography } from '../typography/Typography'

const useStyles = createUseStyles({
    rootButton: {
        margin: '0.75rem',
        padding: '0.5rem',
        borderRadius: Theme.radius,
        boxSizing: 'border-box',
        cursor: 'pointer',
        outline: 'none',
        transition: '0.5s',
        background: 'transparent'
    },
    text: {
        border: '0px',
        color: Theme.colors.primary,
        '&:hover': {
            backgroundColor: 'rgba(244, 143, 177, 0.1)'
        }
    },
    outlined: {
        border: '1px solid rgba(244, 143, 177, 0.5)',
        color: Theme.colors.primary,
        '&:hover': {
            backgroundColor: 'rgba(244, 143, 177, 0.1)'
        }
    },
    contained: {
        border: '0px',
		color: Theme.colors.default,
		backgroundColor: Theme.colors.primary,
        '&:hover': {
            backgroundColor: Theme.colors.dark
        }
    }
})

interface ButtonProps {
    variant?: 'text' | 'outlined' | 'contained'
    style?: React.CSSProperties
    // color?: TColor
    // align?: 'center' | 'left' | 'right' | 'justify'
}

export const Button: FC<ButtonProps> = memo(
    ({ children, style, variant = 'contained' }) => {
        const classes = useStyles()
        return (
            <button
                className={[classes.rootButton, classes[variant]].join(' ')}
                style={style}
            >
                <Typography variant='body'>{children}</Typography>
            </button>
        )
    }
)
