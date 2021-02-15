import React from 'react'
import { Button, Divider, Icon } from 'SharedComponents'

export const ButtonDemo = () => (
    <>
        <h3>Buttons</h3>
        <div className={'wrapper justify-space_ev'}>
            <Button type='submit'>contained</Button>
            <Divider vertical />
            <Button variant='outlined'>outlined</Button>
            <Divider vertical />
            <Button variant='text'>text</Button>
            <Button icon={<Icon type='face' />}>btn + icon</Button>
            <Button variant='outlined' icon={<Icon type='face' />} />
            <Button variant='outlined' icon={<Icon type='face' />} isCircle />
        </div>
    </>
)
