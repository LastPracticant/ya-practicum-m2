import React from 'react';
import { PageComponentProps } from 'client/shared/types';
import { SigninForm } from './components';

export const Signin: React.FC<PageComponentProps> = React.memo(({ title }) => (
    <div>
        <header>
            {title}
        </header>
        <main>
            <SigninForm />
        </main>
    </div>
));
