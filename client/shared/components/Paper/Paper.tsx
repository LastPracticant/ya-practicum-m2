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

export const Paper: FC<{ style?: React.CSSProperties, className?: string }> = memo(
    ({ children, style, className }) => {
        const classes = useStyles()
        return (
            <div className={[classes['YlpPaper-root'], className].join(' ')} style={style}>
                {children}
            </div>
        )
    }
)
