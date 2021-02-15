import React from 'react'
import { PageComponentProps } from 'shared/types'
import { InputControl, Paper } from 'SharedComponents'
import {
    ButtonDemo,
    ChipDemo,
    ListDemo,
    IconDemo,
    AvatarDemo
} from './components'

export const UiKit: React.FC<PageComponentProps> = ({ title }) => (
        <Paper>
            <h1>{title}</h1>
            <InputControl label={'test'} />
            <ButtonDemo />
            <IconDemo />
            <AvatarDemo />
            <ChipDemo />
            <ListDemo />
        </Paper>
)
