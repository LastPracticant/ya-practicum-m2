import React, { FC, memo } from 'react'
import { createUseStyles } from 'react-jss'
import Theme from 'SharedStyles/theme/Theme'

const useStyles = createUseStyles({
    'YlpPaper-root': {
        background: Theme.backgroundColor,
        borderRadius: Theme.radius,
        boxShadow: Theme.shadow
    }
})

export const Paper: FC<{ style?: React.CSSProperties }> = memo(
    ({ children, style }) => {
        const classes = useStyles()
        return (
            <div className={classes['YlpPaper-root']} style={style}>
                {children}
            </div>
        )
    }
)
