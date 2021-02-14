import React, { FC, memo } from 'react';
import { createUseStyles } from 'react-jss';
import { Theme } from 'SharedStyles/theme';
import { Button, Icon, Typography } from 'SharedComponents';
import classnames from 'classnames';

const useStyles = createUseStyles({
    'YlpChip-root': {
        padding: `${Theme.space(1)}px ${Theme.space(2)}px`,
        borderRadius: Theme.space(4),
        boxSizing: 'border-box',
        outline: 'none',
        transition: '0.5s',
        background: 'transparent',
    },
    text: {
        border: '0px',
        color: Theme.colors.primary,
    },
    outlined: {
        border: '1px solid rgba(244, 143, 177, 0.5)',
        color: Theme.colors.primary,
    },
    contained: {
        border: '0px',
        backgroundColor: Theme.colors.primary,
    },
    btnIcon: {
        display: 'flex',
        alignItems: 'center',
        '& button': {
            marginLeft: Theme.space(2),
        },
        '& *': {
            padding: 0,
        },
    },
});

interface ChipProps extends React.HtmlHTMLAttributes<HTMLElement> {
    variant?: 'text' | 'outlined' | 'contained'
    icon?: string | null
}

export const Chip: FC<ChipProps> = memo(
    ({
        children, style, variant = 'contained', icon = null, onClick, className,
    }) => {
        const classes = useStyles();
        return (
            <div
                className={classnames(
                    classes['YlpChip-root'],
                    classes[variant],
                    classes[icon && 'btnIcon'],
                    className,
                )}
                style={style}
            >
                <Typography variant="body">{children}</Typography>
                {icon && (
                    <Button
                        variant="text"
                        isCircle
                        onClick={onClick}
                        icon={<Icon type={icon} size="small" />}
                    />
                )}
            </div>
        );
    },
);
