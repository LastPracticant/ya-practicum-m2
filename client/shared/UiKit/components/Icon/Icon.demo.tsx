import React from 'react';
import { Divider, Icon } from 'SharedComponents';

export const IconDemo = () => (
    <>
        <Divider style={{ marginTop: 24 }} />
        <h3>Icons</h3>
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Icon type="3d_rotation" color="primary" size="small" />
            <Icon type="3d_rotation" color="default" />
            <Icon type="3d_rotation" color="contrastText" size="large" />
        </div>
    </>
);
