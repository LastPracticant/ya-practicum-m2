import React, { FC, memo } from 'react';
import { createUseStyles } from 'react-jss';
import { Theme } from 'SharedStyles/theme';
import classnames from 'classnames';

const useStyles = createUseStyles({
    'YlpList-root': {
        padding: `${Theme.space(2)}px 0px`,
    },
});

interface ListProps extends React.HtmlHTMLAttributes<HTMLElement> {
}

export const List: FC<ListProps> = memo(({ children, style, className }) => {
    const classes = useStyles();

    return (
        <ul className={classnames(classes['YlpList-root'], className)} style={style}>
            {children}
        </ul>
    );
});
