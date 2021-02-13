import React, { FC, memo } from 'react'
import { createUseStyles } from 'react-jss'
import Theme from '../../styles/theme/Theme'
import { Icon } from '../Icon'
// import Theme from 'SharedStyles/theme/Theme'

const useStyles = createUseStyles({
    'YlpAvatar-root': {
        borderRadius: '100%',
        padding: 8,
        backgroundColor: Theme.colors.dark,
    }
})

interface ListItemAvatarProps {
    style?: React.CSSProperties,
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
