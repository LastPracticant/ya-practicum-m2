import React from 'react'
import { Button, Divider, Icon, Typography } from '../index'

export const ButtonDemo = () => (
    <>
        <Divider style={{ marginTop: 24 }} />
        <Typography variant='h3' align='center'>
            {'Buttons'}
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Button>{'contained'}</Button>
            <Divider orientation='vertical' />
            <Button variant='outlined'>{'outlined'}</Button>
            <Divider orientation='vertical' />
            <Button variant='text'>{'text'}</Button>
            <Button icon={<Icon type='face' />}>{'btn + icon'}</Button>
            <Button variant='outlined' icon={<Icon type='face' />} />
            <Button variant='outlined' icon={<Icon type='face' />} isCircle />
        </div>
    </>
)
