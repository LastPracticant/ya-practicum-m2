import React from 'react';
import {
    Avatar, Icon, Button, Divider,
} from 'SharedComponents';

export const ListDemo = () => (
    <>
        <Divider />

        <h3>List Items</h3>
        <ul>
            <li className={'wrapper justify-space_between'}>
                <Avatar type="3d_rotation" />
                <p>List item avatar + text + button (icon)</p>
                <Button
                    variant="text"
                    isCircle
                    icon={<Icon type="face" size="small" />}
                />
            </li>
            <li>
                <Icon type="bookmark_added" />
                <p>List item icon + text</p>
            </li>
            <li>
                <p>List item text</p>
            </li>
        </ul>
    </>
);
