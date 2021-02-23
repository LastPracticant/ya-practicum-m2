import './Paper.css';

import React, { FC, memo } from 'react';
import bem from 'bem-cn';

interface PaperProps extends React.HtmlHTMLAttributes<HTMLElement> {
    sizes?: 'small' | 'medium' | 'large' | 'full'
    theme?: 'dark' | 'light'
    title?: string
}

const block = bem('paper');

export const Paper: FC<PaperProps> = memo(
    ({
        children,
        className,
        title,
        sizes = 'full',
        theme = 'dark',
        ...props
    }) => (
        <div
            className={block({ sizes, theme }).mix(className)}
            {...props}
        >
            {title ? (
                <>
                    <h2 className={block('title')}>{title}</h2>
                    <section className={block('content')}>
                        {children}
                    </section>
                </>
            ) : children}
        </div>
    ),
);
