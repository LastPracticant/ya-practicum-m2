import React, { FC, memo } from 'react';
import { createUseStyles } from 'react-jss';
import { Theme } from 'SharedStyles/theme';
import { Icon } from 'SharedComponents';
import classnames from 'classnames';

const useStyles = createUseStyles({
    'YlpListItemIcon-root': {
        color: Theme.colors.default,
        display: 'inline-flex',
        flexShrink: 0,
        minWidth: Theme.space(14),
    },
});

interface ListItemIconProps extends React.HtmlHTMLAttributes<HTMLElement> {
    type?: string
}

export const ListItemIcon: FC<ListItemIconProps> = memo(
    ({ type = 'face', className, ...props }) => {
        const classes = useStyles();

        return (
            <div className={classnames(classes['YlpListItemIcon-root'], className)} {...props}>
                <Icon type={type} />
            </div>
        );
    },
);
