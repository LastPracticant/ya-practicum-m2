import React, { FC, memo } from 'react'
import { createUseStyles } from 'react-jss'
import { Icon } from '../Icon'
import { Theme } from 'SharedStyles/theme'

const useStyles = createUseStyles({
    'YlpAvatar-root': {
        borderRadius: '100%',
        padding: 8,
        backgroundColor: Theme.colors.dark
    }
})

interface ListItemAvatarProps {
    style?: React.CSSProperties
    type?: string
}

export const Avatar: FC<ListItemAvatarProps> = memo(
    ({ children, style, type = 'face' }) => {
        const classes = useStyles()

        return (
            <div className={classes['YlpAvatar-root']} style={style}>
                <Icon type={type} />
            </div>
        )
    }
)
