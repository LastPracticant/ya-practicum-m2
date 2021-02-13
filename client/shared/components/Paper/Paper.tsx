import React, { FC, memo } from 'react'
import Theme from '../../styles/theme/Theme'

export const Paper: FC<{ style: React.CSSProperties }> = memo(
  ({ children, style }) => {
    return (
      <div
        style={{
          background: Theme.backgroundColor,
          borderRadius: Theme.radius,
          boxShadow: Theme.shadow,
          ...style
        }}
      >
        {children}
      </div>
    )
  }
)
