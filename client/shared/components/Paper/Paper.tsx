 import React, { FC, memo } from 'react';
import classnames from 'classnames';
import './Paper.css';

type PaperProps = React.HtmlHTMLAttributes<HTMLElement>

export const Paper: FC<PaperProps> = memo(
    ({ children, className, ...props }) => (
        <div className={classnames('paper', className)} {...props}>
            {children}
        </div>
    ),
);
