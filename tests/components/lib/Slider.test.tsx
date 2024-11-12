import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest'; 

import {Slider} from '@/components';

beforeEach(() => {
    vi.restoreAllMocks();
    vi.stubGlobal('innerWidth', 800); // Default width for tests
    vi.stubGlobal('addEventListener', vi.fn());
});

describe('Slider()', () => {
    beforeAll(() => {
        render(<Slider />);
    })

    it('"#slider-main" - "h2" - Link = Comprar un auto / static elements has been displayed', () => {
        const sliderMain = screen.getByRole('slider');
        const h2 = screen.getByText(/7 razones/i);
        const staticLink = screen.getByText('Comprar un auto');

        expect(sliderMain).toBeInTheDocument();
        expect(h2).toBeInTheDocument();
        expect(staticLink).toBeInTheDocument();
    })

    it('articles has been displayed', () => {
        const articles = screen.getAllByRole('article');
        const images = screen.getAllByRole('img');
        const h3 = screen.getAllByRole('heading', {level: 3});
        const p = screen.getAllByRole('paragraph');

        const lengthExpected = 7;

        expect(articles).toHaveLength(lengthExpected);
        expect(images).toHaveLength(lengthExpected);
        expect(h3).toHaveLength(lengthExpected);
        expect(p).toHaveLength(lengthExpected);
    })
});
