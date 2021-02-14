import React, { FC, memo } from 'react';
import classnames from 'classnames';
import './Divider.css';

interface DividerProps extends React.HtmlHTMLAttributes<HTMLElement> {
    vertical?: boolean
}

export const Divider: FC<DividerProps> = memo(
    ({ style, vertical = false, className }) => (
        <hr
            className={classnames(
                'divider',
                { divider__vertical: vertical },
                // classes['YlpDivider-root'],
                // classes[`YlpDivider-${orientation}`],
                className,
            )}
            style={style}
        />
    ),
);
