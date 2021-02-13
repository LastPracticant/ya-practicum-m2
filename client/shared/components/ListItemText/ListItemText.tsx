import React, { FC, memo } from 'react'
import { createUseStyles } from 'react-jss'
import Theme from 'SharedStyles/theme/Theme'
import { Typography } from '../index'

const useStyles = createUseStyles({
    'YlpListItemText-root': {
		minWidth: 0,
        flex: '1 1 auto',
        alignSelf: 'center',
		margin: `${Theme.space(1)}px 0px`
    }
})

interface ListItemTextProps {
    style?: React.CSSProperties
}

export const ListItemText: FC<ListItemTextProps> = memo(({ children, style }) => {
    const classes = useStyles()

    return (
        <div className={classes['YlpListItemText-root']}>
            <Typography>{children}</Typography>
        </div>
    )
})
