import React, { FC, memo } from 'react';
import classnames from 'classnames';
import './Icon.css';

export interface IconProps extends React.HtmlHTMLAttributes<HTMLElement> {
    size?: 'small' | 'medium' | 'large'
    type?: string
}

export const Icon: FC<IconProps> = memo(
    ({
        style, className, size = 'medium', type = 'face',
    }) => (
        <i
            className={classnames(
                'material-icons',
                'Icon',
                `Icon__${size}`,
                className,
            )}
            style={style}
        >
            {type}
        </i>
    ),
);
