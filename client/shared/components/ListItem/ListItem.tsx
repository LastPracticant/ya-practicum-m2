import React, { FC, memo } from 'react'
import { createUseStyles } from 'react-jss'
import Theme from '../../styles/theme/Theme'
// import Theme from 'SharedStyles/theme/Theme'

const useStyles = createUseStyles({
    'YlpListItem-root': {
        display: 'flex',
        padding: `${Theme.space(2)}px ${Theme.space(4)}px`,
        '&:hover': {
            backgroundColor: 'rgba(244, 143, 177, 0.3)'
        }
    }
})

interface ListItemProps {
    style?: React.CSSProperties
}

export const ListItem: FC<ListItemProps> = memo(({ children, style }) => {
    const classes = useStyles()

    return (
        <li className={classes['YlpListItem-root']} style={style}>
            {children}
        </li>
    )
})
