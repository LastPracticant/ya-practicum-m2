import React, { FC, memo } from 'react';
import { createUseStyles } from 'react-jss';
import { Theme } from 'SharedStyles/theme';
import classnames from 'classnames';

const useStyles = createUseStyles({
    'YlpDivider-root': {
        border: 'none',
        margin: `0px ${Theme.space(4)}px`,
        height: 1,
        flexShrink: 0,
        backgroundColor: Theme.colors.default,
    },
    'YlpDivider-vertical': {
        width: 1,
        height: 'auto',
        margin: `${Theme.space(4)}px 0px`,
    },
});

interface DividerProps extends React.HtmlHTMLAttributes<HTMLElement>{
    orientation?: 'horizontal' | 'vertical'
}

export const Divider: FC<DividerProps> = memo(
    ({ style, orientation = 'horizontal', className }) => {
        const classes = useStyles();

        return (
            <hr
                className={classnames(
                    classes['YlpDivider-root'],
                    classes[`YlpDivider-${orientation}`],
                    className,
                )}
                style={style}
            />
        );
    },
);
