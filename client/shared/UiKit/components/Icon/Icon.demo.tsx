import React from 'react';
import { Divider, Typography, Icon } from 'SharedComponents';

export const IconDemo = () => (
    <>
        <Divider style={{ marginTop: 24 }} />
        <Typography variant="h3" align="center">
            Icons
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Icon type="3d_rotation" color="primary" size="small" />
            <Icon type="3d_rotation" color="default" />
            <Icon type="3d_rotation" color="contrastText" size="large" />
        </div>
    </>
);
