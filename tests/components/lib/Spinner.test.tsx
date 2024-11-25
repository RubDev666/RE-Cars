import { it, expect, describe } from 'vitest';
import { screen, render } from '@testing-library/react';

import { Spinner } from '@/components';

describe('Spinner()', () => {
    it('has been displayed', () => {
        render(<Spinner />);

        const spin = screen.getByRole('status');

        expect(spin).toBeDefined();
    })    
})
