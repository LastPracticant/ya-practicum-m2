import React from 'react'
import { PageComponentProps } from 'shared/types'
import { Typography, TextField, Paper } from '../../../src/shared/components/index'
import { useForm } from 'react-hook-form'

export const Home: React.FC<PageComponentProps> = ({ title }) => {
    const { register, handleSubmit, errors } = useForm() // initialize the hook
    const onSubmit = data => {
        console.log(data, errors)
    }

    return (
        <Paper>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography variant='h1'>
                    Submit
                </Typography>
                <input name='exampleRequired' ref={register} />
                <TextField
                    name='lastName'
                    register={register({
                        required: 'this is required',
                        pattern: {
                            value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                            message: 'Invalid email address'
                        }
                        // maxLength: {
                        //     value: 2,
                        //     message: 'Max length is 2'
                        // }
                    })}
                    label={'dfs'}
                    error={errors['lastName']}
                    required
                />
                <input type='submit' />
            </form>

            {title}
        </Paper>
    )
}
