import React, { FC, memo } from 'react';
import classnames from 'classnames';
import './Divider.css';

interface DividerProps extends React.HtmlHTMLAttributes<HTMLElement> {
    vertical?: boolean
}

export const Divider: FC<DividerProps> = memo(
    ({ vertical = false, className, ...props }) => (
        <hr
            className={classnames(
                'divider',
                { divider_vertical: vertical },
                className,
            )}
            {...props}
        />
    ),
);
