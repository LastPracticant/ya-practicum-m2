import React from 'react';
import { Divider, Icon } from 'SharedComponents';

export const IconDemo = () => (
    <>
        <Divider />
        <h3>Icons</h3>
        <div className={'wrapper justify-space_ev'}>
            <Icon type="3d_rotation" color="primary" size="small" />
            <Icon type="3d_rotation" color="default" />
            <Icon type="3d_rotation" color="contrastText" size="large" />
        </div>
    </>
);
