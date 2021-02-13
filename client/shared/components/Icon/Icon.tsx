import React, { FC, memo } from 'react'
import { createUseStyles } from 'react-jss'
import Theme from '../../styles/theme/Theme'
import { TColor } from '../../styles/theme/Types'


export interface IconProps {
    size?: 'small' | 'medium' | 'large'
    style?: React.CSSProperties,
    type?: string,
    color?: TColor
}

export const Icon: FC<IconProps> = memo(
    ({ style, size = 'medium', type = 'face', color = 'contrastText' }) => {
        const sizePx = size === 'medium' ? 8 : size === 'small' ? 6 : 10

        const useStyles = createUseStyles({
            root: {
                fontSize: Theme.space(sizePx),
                color: Theme.colors[color]
            }
        })

        const classes = useStyles()
        return (
            <i
                className={['material-icons', classes.root].join(' ')}
                style={style}
            >
                {type}
            </i>
        )
    }
)
