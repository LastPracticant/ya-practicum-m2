import React, { FC, memo } from 'react'
import { createUseStyles } from 'react-jss'
import Theme from '../../styles/theme/Theme'
// import Theme from 'SharedStyles/theme/Theme'

const useStyles = createUseStyles({
    'YlpList-root': {
        padding: `${Theme.space(2)}px 0px`,
    }
})

interface ListProps {
    style?: React.CSSProperties
}

export const List: FC<ListProps> = memo(({ children, style }) => {
    const classes = useStyles()

    return (
        <ul className={classes['YlpList-root']} style={style}>
            {children}
        </ul>
    )
})
