import React from 'react';
import { PageComponentProps } from 'client/shared/types';
import { InputControl, Paper } from 'client/shared/components';
import {
    ButtonDemo,
    ChipDemo,
    ListDemo,
    IconDemo,
    AvatarDemo,
} from './components';

export const UiKit: React.FC<PageComponentProps> = ({ title }) => (
        <Paper>
            <h1>{title}</h1>
            <InputControl name="test" label="test" />
            <ButtonDemo />
            <IconDemo />
            <AvatarDemo />
            <ChipDemo />
            <ListDemo />
        </Paper>
);
