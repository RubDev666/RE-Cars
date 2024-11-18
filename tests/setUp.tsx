import React from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';

import { Providers } from '@/store/Providers';

import { store } from '@/store';
import { RootState } from '@/store';
import { InitialState } from '@/types/storeTypes';

/*const customRender = (
    ui: React.ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: Providers, ...options })

export { customRender as renderWithProviders };
*/

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: Partial<RootState>
    store?: InitialState
}

export function renderWithProviders(
    ui: React.ReactElement,
    extendedRenderOptions: ExtendedRenderOptions = {}
) {
    const {
        preloadedState = {},
        store = preloadedState,
        ...renderOptions
    } = extendedRenderOptions

    // Return an object with the store and all of RTL's query functions
    return {
        store,
        ...render(ui, { wrapper: Providers, ...renderOptions })
    }
}