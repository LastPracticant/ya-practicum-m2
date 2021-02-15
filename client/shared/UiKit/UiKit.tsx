import React from 'react'
import { PageComponentProps } from 'shared/types'
import { InputControl, Paper } from 'SharedComponents'

import { useForm } from 'react-hook-form'
import {
    ButtonDemo,
    ChipDemo,
    ListDemo,
    IconDemo,
    AvatarDemo
} from './components'

export const UiKit: React.FC<PageComponentProps> = ({ title }) => {
    const { register, handleSubmit, errors } = useForm()
    const onSubmit = data => {
        console.log(data, errors)
    }

    return (
        <Paper>
            <h1>{title}</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputControl
                    name='login'
                    register={register}
                    type='text'
                    label='login'
                />
                <ButtonDemo />
            </form>
            <IconDemo />
            <AvatarDemo />
            <ChipDemo />
            <ListDemo />
        </Paper>
    )
}
