import { render, screen } from "@testing-library/react";
import { beforeEach, afterEach, it, expect, describe, vi } from 'vitest';

import Error from "../src/components/ui/Error";

describe('first test', () => {
    it('should', () => {
        render(<Error title="test" message="first" />)

        expect(screen.getByRole('paragraph').textContent).toBe('first');
    })
})