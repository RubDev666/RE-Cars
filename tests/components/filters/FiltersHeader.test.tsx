import { beforeEach, afterEach, it, expect, describe, vi, beforeAll } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { screen, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '../../setUp';
import { FiltersHeader } from '@/components';
import { initialState } from '@/store/cars/cars.slice';

vi.mock('@fortawesome/react-fontawesome', () => ({ 
    FontAwesomeIcon: ({className, icon, onClick}: {className: string | undefined, icon: any, onClick: () => void}) => {
        //console.log(icon.iconName);

        return(
            <span className={className + ' ' + icon.iconName} onClick={onClick} >FontAwesomeIconMock</span> 
        )
    }
}));

describe('FiltersHeader component / first load', () => {


    /*it('static elements', () => {
        const preownedHeader = document.querySelector('.preowned-header') as HTMLDivElement;
        const resultsOrderContainer = document.querySelector('.results-order-container') as HTMLDivElement;

        expect(preownedHeader).toBeInTheDocument();
        expect(resultsOrderContainer).toBeInTheDocument();

        cleanup();
    })*/

    it('button', async () => {
        renderWithProviders(<FiltersHeader resetFilters={vi.fn()} btnOrder={vi.fn()} />, {
            preloadedState: {
                carsReducer: {
                    ...initialState,
                    UIFilters: {
                        ...initialState.UIFilters,
                        showFilters: false,
                    }
                }
            }
        });

        const btnFilters = document.querySelector('.btn-toggle-filters') as  HTMLButtonElement;

        expect(btnFilters).toHaveTextContent('mostrar');

        //await userEvent.click(btnFilters);
        //expect(btnFilters).toHaveTextContent('ocultar filtros');
    })
})
