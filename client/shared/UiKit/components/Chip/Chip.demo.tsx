import React from 'react';
import { Chip, Divider } from 'client/shared/components';

export const ChipDemo = () => (
    <>
        <Divider />
        <h3>Chips</h3>
        <div className={'wrapper justify-space_ev'}>
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
