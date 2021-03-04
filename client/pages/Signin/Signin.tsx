import React from 'react';
import { PageComponentProps } from 'client/shared/types';
import { NivelatorXY, Paper } from 'client/shared/components';
import { withCheckAuth } from 'client/core/HOCs';
import { SigninForm } from './components';

export const SigninComponent: React.FC<PageComponentProps> = React.memo(({ title }) => (
    <NivelatorXY className="home">
        <Paper sizes="small">
            <h1>{title}</h1>
            <SigninForm />
        </Paper>
    </NivelatorXY>
));

export const Signin = withCheckAuth(SigninComponent);
