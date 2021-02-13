import React, { FC, memo } from 'react'
import { createUseStyles } from 'react-jss'
import Theme from '../../styles/theme/Theme'
import { Icon } from '../Icon'
// import Theme from 'SharedStyles/theme/Theme'

const useStyles = createUseStyles({
    'YlpListItemIcon-root': {
        color: Theme.colors.default,
        display: 'inline-flex',
        flexShrink: 0,
        minWidth: Theme.space(14)
    }
})

interface ListItemIconProps {
    style?: React.CSSProperties
    type?: string
}

export const ListItemIcon: FC<ListItemIconProps> = memo(
    ({ style, type = 'face' }) => {
        const classes = useStyles()

        return (
            <div className={classes['YlpListItemIcon-root']} style={style}>
                <Icon type={type} />
            </div>
        )
    }
)
