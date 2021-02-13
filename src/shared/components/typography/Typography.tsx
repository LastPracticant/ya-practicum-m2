import React, { FC, memo } from 'react'
import Theme from '../../styles/theme/Theme'
import { TVariant, TColor } from '../../styles/theme/Types'
import { createUseStyles } from 'react-jss'

interface IProps {
    variant?: TVariant
    style?: React.CSSProperties
    color?: TColor
    align?: 'center' | 'left' | 'right' | 'justify'
}

export const Typography: FC<IProps> = memo(
    ({
        variant = 'body',
        children,
        style,
        color = 'default',
        align = 'justify'
    }) => {
        const useStyles = createUseStyles({
            props: { color: Theme.colors[color], textAlign: align },
            ...Theme.typography
        })

        const classes = useStyles()
        const clsList = [classes[variant], classes['props']].join(' ')

        switch (variant) {
            case 'h1':
                return (
                    <h1 className={clsList} style={style}>
                        {children}
                    </h1>
                )
            case 'h2':
                return (
                    <h2 className={clsList} style={style}>
                        {children}
                    </h2>
                )
            case 'h3':
                return (
                    <h3 className={clsList} style={style}>
                        {children}
                    </h3>
                )
            case 'body':
                return (
                    <p className={clsList} style={style}>
                        {children}
                    </p>
                )
            case 'overline':
                return (
                    <span className={clsList} style={style}>
                        {children}
                    </span>
                )
            default:
                return null
        }
    }
)
