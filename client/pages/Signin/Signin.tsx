import React from 'react';
import { PageComponentProps } from 'client/shared/types';
import { NivelatorXY, Paper } from 'client/shared/components';
import { SigninForm } from './components';

export const Signin: React.FC<PageComponentProps> = React.memo(({ title }) => (
    <NivelatorXY className="home">
        <Paper sizes="small">
            <h1>{title}</h1>
            <SigninForm />
        </Paper>
    </NivelatorXY>
));
