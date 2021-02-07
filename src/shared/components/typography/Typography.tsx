import React, { FC, memo } from 'react'
import Theme from '../../styles/theme/Theme'
import { TColor, TVariant } from '../../styles/theme/Types'

interface IProps {
  variant?: TVariant
  color?: TColor
  style?: React.CSSProperties
}

const Typography: FC<IProps> = memo(
  ({ variant = 'body', color = 'default', children, style }) => {
    const styleComponent = {
      ...Theme.typography[variant as TVariant],
      color: Theme.colors[color as TColor],
      ...style
    }
    return <p style={styleComponent}>{children}</p>
  }
)
export default Typography
