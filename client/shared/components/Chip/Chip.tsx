import React, { FC, memo } from 'react';
import { Button, Icon } from 'client/shared/components';
import classnames from 'classnames';
import './Chip.css';

interface ChipProps extends React.HtmlHTMLAttributes<HTMLElement> {
    variant?: 'text' | 'outlined' | 'contained'
    icon?: string
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
                `type_${variant}`,
                { 'chip-with_icon': icon },
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
