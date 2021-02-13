import React, { FC, memo } from 'react'
import { createUseStyles } from 'react-jss'
import Theme from 'SharedStyles/theme/Theme'
import { Avatar } from '../index'

const useStyles = createUseStyles({
    'YlpListItemAvatar-root': {
        color: Theme.colors.dark,
        display: 'inline-flex',
        flexShrink: 0,
        minWidth: Theme.space(14),
    }
})

interface ListItemAvatarProps {
    style?: React.CSSProperties,
    type?: string
}

export const ListItemAvatar: FC<ListItemAvatarProps> = memo(
    ({ children, style, type = 'face' }) => {
        const classes = useStyles()

        return (
            <div className={classes['YlpListItemAvatar-root']} style={style}>
                <Avatar type={type} />
            </div>
        )
    }
)
