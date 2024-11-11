import { it, expect, describe, vi, beforeAll, afterAll } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Error } from '@/components';

vi.mock('@fortawesome/react-fontawesome', () => ({ 
    FontAwesomeIcon: () => <span>FontAwesomeIconMock</span> 
}));

afterAll(() => {
    vi.clearAllMocks();
})

describe('Error({title, message}: {title: string, message: string})', () => {
    const titleExpect = '404';
    const messageExpect = 'Page not found';

    beforeAll(() => {
        render(<Error title={titleExpect} message={messageExpect} />);
    })

    it('All elements of the component are displayed', () => {
        const mainDiv = screen.getByRole('alert');
        const h1 = screen.getByText(titleExpect);
        const p = screen.getByText(messageExpect);
        const FontAwesomeIconMock = screen.getByText('FontAwesomeIconMock');

        expect(mainDiv.childNodes.length).toBe(3);
        expect(h1).toBeDefined();
        expect(p).toBeDefined();
        expect(FontAwesomeIconMock).toBeDefined();
    })
})
