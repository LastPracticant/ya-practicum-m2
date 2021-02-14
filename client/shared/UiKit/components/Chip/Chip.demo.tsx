import React from 'react';
import { Chip, Divider } from 'SharedComponents';

export const ChipDemo = () => (
    <>
        <Divider style={{ marginTop: 24 }} />
        <h3>Chips</h3>
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Chip variant="outlined" icon="add_circle_outline">
                outlined + icon
            </Chip>
            <Chip variant="contained">contained</Chip>
            <Chip variant="contained" icon="add_circle_outline">
                contained
            </Chip>
        </div>
    </>
);
