import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { Popup } from './Popup';

afterEach(cleanup);

describe('Popup', () => {
    it('Render show Popup component', () => {
        const { asFragment } = render(<Popup isVisible>hello world</Popup>);
        expect(asFragment()).toMatchSnapshot();
    });
});
