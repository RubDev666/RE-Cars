import { it, expect, describe, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Skeleton } from '@/components';

describe('Skeleton({type}: {type: string})', () => {
    const typeSkeleton = 'loading';

    beforeAll(() => {
        render(<Skeleton type={typeSkeleton} />);
    })

    it('has been displayed / type class added successfully', () => {
        const skeleton = screen.getByRole('status');

        expect(skeleton).toBeDefined();
        expect(skeleton.classList.contains(`skeleton-${typeSkeleton}`)).toBeTruthy();
    })
})
