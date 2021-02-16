import React, { FC, memo } from 'react';
import classnames from 'classnames';
import './Paper.css';

interface PaperProps extends React.HtmlHTMLAttributes<HTMLElement> {
    sizes?: 'small' | 'medium' | 'large' | 'full'
    theme?: 'dark' | 'light'
}

export const Paper: FC<PaperProps> = memo(
    ({
        children,
        className,
        sizes = 'full',
        theme = 'dark',
        ...props
    }) => (
        <div
            className={classnames(
                'paper',
                className,
                `paper_${sizes}`,
                `paper_theme_${theme}`,
            )}
            {...props}
        >
            {children}
        </div>
    ),
);
