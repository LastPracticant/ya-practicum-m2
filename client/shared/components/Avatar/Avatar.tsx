import React, { FC, memo } from 'react';
import { createUseStyles } from 'react-jss';
import { Icon } from 'SharedComponents';
import { Theme } from 'SharedStyles/theme';
import classnames from 'classnames';

const useStyles = createUseStyles({
    'YlpAvatar-root': {
        borderRadius: '100%',
        padding: 8,
        backgroundColor: Theme.colors.dark,
    },
});

interface ListItemAvatarProps extends React.HtmlHTMLAttributes<HTMLElement> {
    type?: string
}

export const Avatar: FC<ListItemAvatarProps> = memo(
    ({ style, type = 'face', className }) => {
        const classes = useStyles();

        return (
            <div className={classnames(classes['YlpAvatar-root'], className)} style={style}>
                <Icon type={type} />
            </div>
        );
    },
);
