import React from 'react';
import { Divider, Avatar } from 'SharedComponents';

export const AvatarDemo = () => (
    <>
        <Divider style={{ marginTop: 8 }} />
        <h3>Avatars</h3>
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Avatar type="3d_rotation" />
        </div>
    </>
);
