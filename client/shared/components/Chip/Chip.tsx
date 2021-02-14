import React, { FC, memo } from 'react';
import { Button, Icon } from 'SharedComponents';
import classnames from 'classnames';
import './Chip.css';

interface ChipProps extends React.HtmlHTMLAttributes<HTMLElement> {
    variant?: 'text' | 'outlined' | 'contained'
    icon?: string | null
}

export const Chip: FC<ChipProps> = memo(
    ({
        children,
        variant = 'contained',
        icon = null,
        onClick,
        className,
        ...props
    }) => (
        <div
            className={classnames(
                'chip',
                `chip__${variant}`,
                { chip__icon: icon },
                className,
            )}
            {...props}
        >
            <p>{children}</p>
            {icon && (
                <Button
                    variant="text"
                    isCircle
                    onClick={onClick}
                    icon={<Icon type={icon} size="small" />}
                />
            )}
        </div>
    ),
);
