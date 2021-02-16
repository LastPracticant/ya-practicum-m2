import React from 'react';
import { Divider, Avatar } from 'client/shared/components';

export const AvatarDemo = () => (
    <>
        <Divider />
        <h3>Avatars</h3>
        <div className={'wrapper justify-space_ev'}>
            <Avatar type="3d_rotation" />
        </div>
    </>
);
