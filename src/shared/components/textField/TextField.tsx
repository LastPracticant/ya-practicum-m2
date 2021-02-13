import React, { FC, memo } from 'react'
import { createUseStyles } from 'react-jss'
import Theme from '../../styles/theme/Theme'

import { Typography } from '../typography/Typography'

const useStyles = createUseStyles({
    input: {
        position: 'relative',
        flexGrow: 1,
        margin: '0.75rem',
        '& input': {
            position: 'relative',
            top: 0,
            left: 0,
            width: '100%',
            border: `1px solid ${Theme.colors.default}`,
            background: 'transparent',
            padding: '0.5rem',
            borderRadius: Theme.radius,
            boxSizing: 'border-box',
            outline: 'none',
            color: Theme.colors.default,
            backgroundColor: Theme.backgroundColor,
            ...Theme.typography['body'],
            '&:not(:placeholder-shown) ~ label': {
                transform: 'translateX(0.5em) translateY(-1em)',
                fontSize: '0.8rem',
                lineHeight: 1
            },
            '&:focus': {
                color: Theme.colors.primary,
                borderColor: Theme.colors.primary,
                '& ~ label': {
                    color: Theme.colors.primary
                }
            }
        },
        '& label': {
            position: 'absolute',
            top: '0.5rem',
            left: '0.5rem',
            fontSize: '1rem',
            color: Theme.colors.default,
            background: Theme.backgroundColor,
            transition: '0.3s',
            pointerEvents: 'none'
        },
        '& span': {
            color: Theme.colors.error,
            marginLeft: '0.5rem'
        }
    }
})

type RefReturn =
    | string
    | ((instance: HTMLInputElement | null) => void)
    | React.RefObject<HTMLInputElement>
    | null
    | undefined

type InputProps = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> & {
    label: string
    name: string
    type: 'password' | 'text' | 'email' | 'file' | 'tel'
    error: any | null
    register: () => RefReturn
    // ({ required }: { required?: boolean | string }) => RefReturn
}

export const TextField: FC<InputProps> = memo(
    ({ label, name, type = 'text', register, error }) => {
        const classes = useStyles()
        return (
            <div className={classes.input}>
                <input
                    type={type}
                    name={name}
                    ref={register}
                    placeholder={' '}
                />
                <label htmlFor={name}>{label}</label>
                {error && (
                    <Typography variant='overline'>{error.message}</Typography>
                )}
            </div>
        )
    }
)
