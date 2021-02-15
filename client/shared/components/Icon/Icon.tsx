import React, { FC, memo } from 'react'
import classnames from 'classnames'
import './Icon.css'

export interface IconProps extends React.HtmlHTMLAttributes<HTMLElement> {
    size?: 'small' | 'medium' | 'large'
    type?: string
}

export const Icon: FC<IconProps> = memo(
    ({ className, size = 'medium', type = 'face', ...props }) => (
        <i
            className={classnames(
                'material-icons',
                'icon',
                `size_${size}`,
                className
            )}
            {...props}
        >
            {type}
        </i>
    )
)
