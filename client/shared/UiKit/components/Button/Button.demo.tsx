import React from 'react';
import {
    Button, Divider, Icon,
} from 'SharedComponents';

export const ButtonDemo = () => (
    <>
        <Divider style={{ marginTop: 24 }} />
        <h3>
            Buttons
        </h3>
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Button type="submit">contained</Button>
            <Divider vertical />
            <Button variant="outlined">outlined</Button>
            <Divider vertical />
            <Button variant="text">text</Button>
            <Button icon={<Icon type="face" />}>btn + icon</Button>
            <Button variant="outlined" icon={<Icon type="face" />} />
            <Button variant="outlined" icon={<Icon type="face" />} isCircle />
        </div>
    </>
);
