import React from 'react';
import { Divider, Typography, Avatar } from 'SharedComponents';

export const AvatarDemo = () => (
    <>
        <Divider style={{ marginTop: 8 }} />
        <Typography variant="h3" align="center">
            Avatars
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Avatar type="3d_rotation" />
        </div>
    </>
);
