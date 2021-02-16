import React, { FC, memo } from 'react';
import { Icon } from 'client/shared/components';
import classnames from 'classnames';
import './Avatar.css';

interface ListItemAvatarProps extends React.HtmlHTMLAttributes<HTMLElement> {
    type?: string
}

export const Avatar: FC<ListItemAvatarProps> = memo(
    ({ type = 'face', className, ...props }) => (
        <div className={classnames('avatar', className)} {...props}>
            <Icon type={type} />
        </div>
    ),
);
