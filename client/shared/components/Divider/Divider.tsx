import React, { FC, memo } from 'react'
import { createUseStyles } from 'react-jss'
import Theme from '../../styles/theme/Theme'
// import Theme from 'SharedStyles/theme/Theme'
import { Typography } from '../typography/Typography'

const useStyles = createUseStyles({
    'YlpDivider-root': {
        border: 'none',
        margin: `0px ${Theme.space(4)}px`,
        height: 1,
        flexShrink: 0,
        backgroundColor: Theme.colors.default
    },
    'YlpDivider-vertical': {
        width: 1,
        height: 'auto',
        margin: `${Theme.space(4)}px 0px`
    }
})

interface DividerProps {
    orientation?: 'horizontal' | 'vertical'
    style?: React.CSSProperties
}

export const Divider: FC<DividerProps> = memo(
    ({ style, orientation = 'horizontal' }) => {
        const classes = useStyles()

        const classNameList = [
            classes['YlpDivider-root'],
            classes[`YlpDivider-${orientation}`]
        ]
        return <hr className={classNameList.join(' ')} />
    }
)
