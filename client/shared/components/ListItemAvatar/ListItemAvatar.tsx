import React, { FC, memo } from 'react';
import { createUseStyles } from 'react-jss';
import { Theme } from 'SharedStyles/theme';
import { Avatar } from 'SharedComponents';

const useStyles = createUseStyles({
    'YlpListItemAvatar-root': {
        color: Theme.colors.dark,
        display: 'inline-flex',
        flexShrink: 0,
        minWidth: Theme.space(14),
    },
});

interface ListItemAvatarProps extends React.HtmlHTMLAttributes<HTMLElement> {
    type?: string
}

export const ListItemAvatar: FC<ListItemAvatarProps> = memo(
    ({ type = 'face', ...props }) => {
        const classes = useStyles();

        return (
            <div className={classes['YlpListItemAvatar-root']} {...props}>
                <Avatar type={type} />
            </div>
        );
    },
);
