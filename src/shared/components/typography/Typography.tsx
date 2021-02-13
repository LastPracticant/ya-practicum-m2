import React, { FC, memo } from 'react'
import Theme from '../../styles/theme/Theme'
import { TVariant } from '../../styles/theme/Types'
import { createUseStyles } from 'react-jss'

interface IProps {
    variant?: TVariant
    style?: React.CSSProperties
}

const useStyles = createUseStyles({ ...Theme.typography })

export const Typography: FC<IProps> = memo(
    ({ variant = 'body', children, style }) => {
        const classes = useStyles()

        switch (variant) {
            case 'h1':
                return (
                    <h1 className={classes[variant]} style={style}>
                        {children}
                    </h1>
                )
            case 'h2':
                return (
                    <h2 className={classes[variant]} style={style}>
                        {children}
                    </h2>
                )
            case 'h3':
                return (
                    <h3 className={classes[variant]} style={style}>
                        {children}
                    </h3>
                )
            case 'body':
                return (
                    <p className={classes[variant]} style={style}>
                        {children}
                    </p>
                )
            case 'overline':
                return (
                    <span className={classes[variant]} style={style}>
                        {children}
                    </span>
                )
        }
    }
)
