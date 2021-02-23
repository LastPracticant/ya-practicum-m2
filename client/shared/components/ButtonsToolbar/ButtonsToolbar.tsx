import './ButtonsToolbar.css';

import React, { FC, memo } from 'react';
import block from 'bem-cn';
import { GridJustification } from '@material-ui/core';

interface ButtonsToolbarProps extends React.HtmlHTMLAttributes<HTMLElement> {
    justify?: GridJustification
    gutter?: number
    noMargin?: boolean
}

const b = block('buttons-toolbar');

export const ButtonsToolbar: FC<ButtonsToolbarProps> = memo(
    ({
        children,
        className,
        justify,
        noMargin,
    }) => (
        <div
            className={b({ 'no-margin': noMargin }).mix(className)}
            style={{
                justifyContent: justify,
            }}
        >
            {children}
        </div>
    ),
);
