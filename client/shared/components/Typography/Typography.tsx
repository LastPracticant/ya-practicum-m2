import React, { FC, memo } from 'react';
import { Theme, TagTypography, ColorProps } from 'SharedStyles/theme';
import { createUseStyles } from 'react-jss';
import classnames from 'classnames';

interface TypographyProps extends React.HtmlHTMLAttributes<HTMLElement> {
    variant?: TagTypography
    color?: ColorProps
    align?: 'center' | 'left' | 'right' | 'justify'
}

export const Typography: FC<TypographyProps> = memo(
    ({
        variant = 'body',
        children,
        color = 'contrastText',
        align = 'justify',
        className,
        ...props
    }) => {
        const useStyles = createUseStyles({
            props: { color: Theme.colors[color], textAlign: align },
            ...Theme.typography,
        });

        const classes = useStyles();
        const clsList = classnames(classes[variant], classes.props, className);

        switch (variant) {
        case 'h1':
            return (
                    <h1 className={clsList} {...props}>
                        {children}
                    </h1>
            );
        case 'h2':
            return (
                    <h2 className={clsList} {...props}>
                        {children}
                    </h2>
            );
        case 'h3':
            return (
                    <h3 className={clsList} {...props}>
                        {children}
                    </h3>
            );
        case 'body':
            return (
                    <p className={clsList} {...props}>
                        {children}
                    </p>
            );
        case 'overline':
            return (
                    <span className={clsList} {...props}>
                        {children}
                    </span>
            );
        default:
            return null;
        }
    },
);
