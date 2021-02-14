import React, { FC, memo } from 'react';
import { Icon } from 'SharedComponents';
import classnames from 'classnames';
import './Avatar.css';

interface ListItemAvatarProps extends React.HtmlHTMLAttributes<HTMLElement> {
    type?: string
}

export const Avatar: FC<ListItemAvatarProps> = memo(
    ({ style, type = 'face', className }) => (
        <div className={classnames('avatar', className)} style={style}>
            <Icon type={type} />
        </div>
    ),
);
