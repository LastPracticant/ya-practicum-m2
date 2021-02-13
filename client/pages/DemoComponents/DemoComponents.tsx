import React from 'react'
import { PageComponentProps } from 'shared/types'
import {
    Typography,
    TextField,
    Paper,
    Button,
    Divider,
    ListItemText,
    ListItemAvatar,
    ListItem,
    List,
    Icon
} from '../../shared/components/index'
// import { Typography, TextField, Paper, Button, Divider } from 'SharedComponents'

import { useForm } from 'react-hook-form'
// import Theme from '../../../src/shared/styles/theme/Theme'
import Theme from 'SharedStyles/theme/Theme'

export const DemoComponents: React.FC<PageComponentProps> = ({ title }) => {
    const { register, handleSubmit, errors } = useForm() // initialize the hook
    const onSubmit = data => {
        console.log(data, errors)
    }

    return (
        <Paper
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: 400,
                margin: 'auto',
                padding: Theme.space(2)
            }}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography
                    variant='h1'
                    align='center'
                    style={{ marginBottom: 32 }}
                >
                    Демо компоненты
                </Typography>
                <TextField
                    name='login'
                    register={register({
                        required: 'this is required',
                        maxLength: {
                            value: 2,
                            message: 'Max length is 2'
                        }
                    })}
                    label={'Login'}
                    error={errors['login']}
                    required
                />
                <TextField
                    name='email'
                    register={register({
                        required: 'this is required',
                        pattern: {
                            value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                            message: 'Invalid email address'
                        }
                    })}
                    label={'Email'}
                    error={errors['email']}
                    required
                />
                <TextField
                    name='password'
                    register={register({
                        required: 'this is required'
                    })}
                    type={'password'}
                    label={'Password'}
                    error={errors['password']}
                />
                <Divider />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button>{'contained'}</Button>
                    <Divider orientation='vertical' />
                    <Button variant='outlined'>{'outlined'}</Button>
                    <Divider orientation='vertical' />
                    <Button variant='text'>{'text'}</Button>
                </div>
            </form>
            <List>
                <ListItem>
                    <ListItemAvatar type={'3d_rotation'} />
                    <ListItemText>{'fdsfds'}</ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemAvatar type={'bookmark_added'} />
                    <ListItemText>{'fdsfds'}</ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemAvatar type={'api'} />
                    <ListItemText>{'fdsfds'}</ListItemText>
                </ListItem>
            </List>
        </Paper>
    )
}
