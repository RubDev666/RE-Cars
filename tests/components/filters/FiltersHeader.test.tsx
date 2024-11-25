import { it, expect, describe, vi, beforeAll, afterAll } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '../../setUp';
import { FiltersHeader } from '@/components';
import { initialState } from '@/store/cars/cars.slice';
import { CARS_DB } from '@/db/cars';

/*vi.mock('@fortawesome/react-fontawesome', () => ({ 
    FontAwesomeIcon: ({className, icon, onClick}: {className: string | undefined, icon: any, onClick: () => void}) => {
        //console.log(icon.iconName);

        return(
            <span className={className + ' ' + icon.iconName} onClick={onClick} ></span> 
        )
    }
}));*/

vi.mock('@fortawesome/react-fontawesome');

describe('FiltersHeader component / first load', () => {
    beforeAll(() => {
        renderWithProviders(<FiltersHeader resetFilters={vi.fn()} btnOrder={vi.fn()} />, {
            preloadedState: {
                carsReducer: {
                    ...initialState,
                    cars: CARS_DB,
                }
            }
        });
    })

    afterAll(() => {
        cleanup();
    })

    it('static elements', () => {
        const preownedHeader = document.querySelector('.preowned-header') as HTMLDivElement;
        const resultsOrderContainer = document.querySelector('.results-order-container') as HTMLDivElement;
        const orderOptionsPreowned = document.querySelector('.order-options-preowned') as HTMLDivElement;

        expect(preownedHeader).toBeInTheDocument();
        expect(resultsOrderContainer).toBeInTheDocument();
        expect(orderOptionsPreowned).toBeInTheDocument();
    })

    it('"btnFilters" and "btnClean" have the correct text', async () => {
        const btnFilters = document.querySelector('.btn-toggle-filters') as  HTMLButtonElement;
        const btnClean = screen.getByText('Limpiar');

        expect(btnFilters).toBeInTheDocument();
        expect(btnFilters).toHaveTextContent('ocultar');
        expect(btnFilters).not.toHaveTextContent('mostrar');
        expect(btnClean).toBeInTheDocument();
    })

    it('text results has the correct data', () => {
        const results = screen.getByText(/resultados/i);

        const expect_textResults = `${CARS_DB.length} Resultados`;

        expect(results).toBeInTheDocument();
        expect(results).toHaveTextContent(expect_textResults);
    })

    it('"btnOrder" has the correct data', () => {
        const btnOrder = screen.getByText(/ordenar:/i);
        const selected = document.querySelector('.selected') as HTMLSpanElement;
        const iconOrder = document.querySelector('.icon-order') as HTMLSpanElement;

        expect(btnOrder).toBeInTheDocument();
        expect(iconOrder).toHaveClass('angle-down');
        expect(selected).toHaveTextContent('');
    })

    it('".options-container-preowned" should not be displayed', () => {
        const optionsContainerPreowned = document.querySelector('.options-container-preowned') as HTMLDivElement;

        expect(optionsContainerPreowned).not.toBeInTheDocument();
    })
})

describe('"btnFilters" / click event', () => {
    beforeAll(() => {
        renderWithProviders(<FiltersHeader resetFilters={vi.fn()} btnOrder={vi.fn()} />);
    })

    afterAll(() => {
        cleanup();
    })

    const expect_filters_hidden = async (hiddenFilters: boolean) => {
        const btnFilters = document.querySelector('.btn-toggle-filters') as  HTMLButtonElement;

        const text1 = hiddenFilters ? 'ocultar' : 'mostrar';
        const text2 = hiddenFilters ? 'mostrar' : 'ocultar';

        await userEvent.click(btnFilters);

        expect(btnFilters).not.toHaveTextContent(text1);
        expect(btnFilters).toHaveTextContent(text2);
    }

    it('"btnFilters" / filters have been hidden', async () => {
        await expect_filters_hidden(true);
    })

    it('"btnFilters" / filters have been displayed', async () => {
        await expect_filters_hidden(false);
    })
})

describe('"btnOrderOptions" / click event', () => {
    beforeAll(() => {
        renderWithProviders(<FiltersHeader resetFilters={vi.fn()} btnOrder={vi.fn()} />);
    })

    afterAll(() => {
        cleanup();
    })

    const expect_options = async (openOptions: boolean) => {
        const btnOrder = screen.getByText(/ordenar:/i);
        const iconOrder = document.querySelector('.icon-order') as HTMLSpanElement;

        const iconShow = openOptions ? 'angle-up' : 'angle-down';
        const iconHidden = !openOptions ? 'angle-up' : 'angle-down';

        await userEvent.click(btnOrder);

        expect(iconOrder).not.toHaveClass(iconHidden);
        expect(iconOrder).toHaveClass(iconShow);
    }

    it('open options / the icon button has been changed', async () => {
        await expect_options(true);
    })

    it('open options / ".options-container-preowned" has been displayed', () => {
        const optionsContainerPreowned = document.querySelector('.options-container-preowned') as HTMLDivElement;

        expect(optionsContainerPreowned).toBeInTheDocument();
        expect(optionsContainerPreowned.childNodes.length).toBe(4);
    })

    it('close options / the icon button has been changed', async () => {
        await expect_options(false);
    })

    it('close options / ".options-container-preowned" has not been displayed', () => {
        const optionsContainerPreowned = document.querySelector('.options-container-preowned') as HTMLDivElement;

        expect(optionsContainerPreowned).not.toBeInTheDocument();
    }) 
})
