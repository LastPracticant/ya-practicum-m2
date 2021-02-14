import React, { FC, memo } from 'react';
import { createUseStyles } from 'react-jss';
import { Theme } from 'SharedStyles/theme';
import { Typography } from 'SharedComponents';
import classnames from 'classnames';

const useStyles = createUseStyles({
    'YlpListItemText-root': {
        minWidth: 0,
        flex: '1 1 auto',
        alignSelf: 'center',
        margin: `${Theme.space(1)}px 0px`,
    },
});

interface ListItemTextProps extends React.HtmlHTMLAttributes<HTMLElement> {
}

export const ListItemText: FC<ListItemTextProps> = memo(
    ({ children, className, ...props }) => {
        const classes = useStyles();

        return (
            <div className={classnames(classes['YlpListItemText-root'], className)} {...props}>
                <Typography>{children}</Typography>
            </div>
        );
    },
);
