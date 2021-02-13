import React, { FC, memo } from 'react'
import { createUseStyles } from 'react-jss'
import Theme from 'SharedStyles/theme/Theme'
import { Typography } from '../index'

const useStyles = createUseStyles({
    'YlpListTextField-root': {
        position: 'relative',
        flexGrow: 1,
        margin: Theme.space(4),
        '& input': {
            position: 'relative',
            top: 0,
            left: 0,
            width: '100%',
            border: `1px solid ${Theme.colors.default}`,
            background: 'transparent',
            padding: Theme.space(2),
            borderRadius: Theme.radius,
            boxSizing: 'border-box',
            outline: 'none',
            color: Theme.colors.default,
            backgroundColor: Theme.backgroundColor,
            ...Theme.typography['body'],
            '&:not(:placeholder-shown) ~ label': {
                transform: `translateX(${Theme.space(
                    2
                )}px) translateY(-${Theme.space(4.5)}px)`,
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
            top: Theme.space(3.5),
            left: Theme.space(2),
            fontSize: '1rem',
            color: Theme.colors.default,
            background: Theme.backgroundColor,
            transition: '0.3s',
            pointerEvents: 'none'
        },
        '& span': {
            color: Theme.colors.error,
            marginLeft: Theme.space(2)
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
    type: 'password' | 'text' | 'email' | 'file' | 'tel' | 'button'
    error: any | null
    register: () => RefReturn
}

export const TextField: FC<InputProps> = memo(
    ({ label, name, type = 'text', register, error }) => {
        const classes = useStyles()
        return (
            <div className={classes['YlpListTextField-root']}>
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
