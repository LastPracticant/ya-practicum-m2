import React, { FC, memo } from 'react';
import { createUseStyles } from 'react-jss';
import { Theme } from 'SharedStyles/theme';
import classnames from 'classnames';

const useStyles = createUseStyles({
    'YlpListItem-root': {
        display: 'flex',
        padding: `${Theme.space(2)}px ${Theme.space(4)}px`,
        alignItems: 'center',
        '&:hover': {
            backgroundColor: 'rgba(244, 143, 177, 0.3)',
        },
    },
});

interface ListItemProps extends React.HtmlHTMLAttributes<HTMLElement> {
}

export const ListItem: FC<ListItemProps> = memo(({ children, style, className }) => {
    const classes = useStyles();

    return (
        <li className={classnames(classes['YlpListItem-root'], className)} style={style}>
            {children}
        </li>
    );
});
