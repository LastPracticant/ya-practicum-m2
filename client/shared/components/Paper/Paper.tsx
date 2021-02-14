import React, { FC, memo } from 'react';
import { createUseStyles } from 'react-jss';
import { Theme } from 'SharedStyles/theme';
import classnames from 'classnames';

const useStyles = createUseStyles({
    'YlpPaper-root': {
        background: Theme.backgroundColor,
        borderRadius: Theme.radius,
        boxShadow: Theme.shadow,
    },
});

interface PaperProps extends React.HtmlHTMLAttributes<HTMLElement> {
}

export const Paper: FC<PaperProps> = memo(({ children, className, ...props }) => {
    const classes = useStyles();
    return (
        <div
            className={classnames(classes['YlpPaper-root'], className)}
            {...props}
        >
            {children}
        </div>
    );
});
