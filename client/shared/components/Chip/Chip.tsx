import React, { FC, memo } from 'react'
import { createUseStyles } from 'react-jss'
import Theme from '../../styles/theme/Theme'
// import Theme from 'SharedStyles/theme/Theme'
import { Typography } from '../typography/Typography'
import { Icon } from '../Icon'
import { Button } from '../Button'

const useStyles = createUseStyles({
    'YlpChip-root': {
        padding: `${Theme.space(1)}px ${Theme.space(2)}px`,
        borderRadius: Theme.space(4),
        boxSizing: 'border-box',
        outline: 'none',
        transition: '0.5s',
        background: 'transparent'
    },
    text: {
        border: '0px',
        color: Theme.colors.primary
    },
    outlined: {
        border: '1px solid rgba(244, 143, 177, 0.5)',
        color: Theme.colors.primary
    },
    contained: {
        border: '0px',
        backgroundColor: Theme.colors.primary
    },
    btnIcon: {
        display: 'flex',
        alignItems: 'center',
        '& button': {
            marginLeft: Theme.space(2)
        },
        '& *': {
            padding: 0
        }
    }
})

interface ChipProps {
    variant?: 'text' | 'outlined' | 'contained'
    style?: React.CSSProperties
    icon?: string | null
    onClick?:
        | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
        | undefined
}

export const Chip: FC<ChipProps> = memo(
    ({ children, style, variant = 'contained', icon = null, onClick }) => {
        const classes = useStyles()
        return (
            <div
                className={[
                    classes['YlpChip-root'],
                    classes[variant],
                    classes[icon && 'btnIcon']
                ].join(' ')}
                style={style}
                onClick={onClick}
            >
                <Typography variant='body'>{children}</Typography>
                {icon && (
                    <Button
                        variant='text'
                        isCircle
                        onClick={onClick}
                        icon={<Icon type={icon} size='small' />}
                    />
                )}
            </div>
        )
    }
)
