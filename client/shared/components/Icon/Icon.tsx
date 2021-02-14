import React, { FC, memo } from 'react';
import { createUseStyles } from 'react-jss';
import { Theme, ColorProps } from 'SharedStyles/theme';
import classnames from 'classnames';

export interface IconProps extends React.HtmlHTMLAttributes<HTMLElement> {
    size?: 'small' | 'medium' | 'large'
    type?: string
    color?: ColorProps
}

export const Icon: FC<IconProps> = memo(
    ({
        style,
        className,
        size = 'medium',
        type = 'face',
        color = 'contrastText',
    }) => {
        const sizePx = { small: 6, medium: 8, lagre: 10 };

        const useStyles = createUseStyles({
            root: {
                fontSize: Theme.space(sizePx[size]),
                color: Theme.colors[color],
            },
        });

        const classes = useStyles();
        return (
            <i
                className={classnames(
                    'material-icons',
                    classes.root,
                    className,
                )}
                style={style}
            >
                {type}
            </i>
        );
    },
);
