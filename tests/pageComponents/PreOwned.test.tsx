import { afterEach, it, expect, describe, vi, beforeAll, afterAll } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { screen, cleanup, fireEvent } from '@testing-library/react';

import { renderWithProviders } from '../setUp';
import PreOwned from '@/pageComponents/PreOwned';
import { initialState } from '@/store/cars/cars.slice';
import { Spinner, Error, FiltersHeader, ModalFilters, Car } from '@/components';
import { CARS_DB } from '@/db/cars';
import userEvent from '@testing-library/user-event';
import { InitialState } from '@/types/storeTypes';
import * as nextNavigation from 'next/navigation';

vi.mock('@fortawesome/react-fontawesome');
vi.mock('next/navigation');
vi.mock('@/components', {spy: true});

const render_customState = (customState: InitialState) => {
    renderWithProviders(<PreOwned />,  {
        preloadedState: {
            carsReducer: customState
        }
    });
}

const cleanTest = () => {
    cleanup();
    vi.resetAllMocks();
}

const mobileWidth = 400;
const desktopWidth = 1400;

describe('first load / fetchstatus tests', () => {
    afterEach(() => cleanTest());

    it(' if(fetchStatus === "loading") / spinner component has been displayed', () => {
        render_customState(initialState);

        expect(Spinner).toHaveBeenCalled();
        expect(Error).not.toHaveBeenCalled();
        expect(FiltersHeader).not.toHaveBeenCalled();
    })

    it(' if(fetchStatus === "error") / error component has been displayed', () => {
        render_customState({
            ...initialState,
            fetchStatus: 'error',
            carsStatus: 'not results',
        })

        expect(Error).toHaveBeenCalled();
        expect(Spinner).not.toHaveBeenCalled();
        expect(FiltersHeader).not.toHaveBeenCalled();
    })
})

describe('first load (mobile size) / fetchStatus === "completed" / carsStatus === "succes"', () => {
    beforeAll(() => {
        window.innerWidth = mobileWidth;

        render_customState({
            ...initialState,
            cars: CARS_DB,
            fetchStatus: 'completed',
            carsStatus: 'succes',
        })
    })

    afterAll(() => cleanTest());

    it('"FiltersHeader" component has been displayed', () => {
        expect(FiltersHeader).toHaveBeenCalled();        
    })

    it('"cars-filters-container" has been displayed / classes were added successfully', () => {
        const carsFiltersContainer = document.querySelector('.cars-filters-container') as HTMLDivElement;    
        
        expect(carsFiltersContainer).toBeInTheDocument();
        expect(carsFiltersContainer).toHaveClass('relative grid-layout-actived');
        expect(carsFiltersContainer).not.toHaveClass('relative grid-layout-disabled');
    })

    it('".filters-container" and "btnFilters" have been displayed', () => {
        const filtersContainer = document.querySelector('.filters-container') as HTMLDivElement;
        const btnFilters = screen.getByText('+ Filtros');

        expect(filtersContainer).toBeInTheDocument();
        expect(btnFilters).toBeInTheDocument();
    })

    it('"ModalFilters" component has not been displayed', () => {
        expect(ModalFilters).not.toHaveBeenCalled();
    })

    it('click event / if "modalFilters" is true, "ModalFilters" component should be displayed', async () => {
        const btnFilters = screen.getByText('+ Filtros');

        await userEvent.click(btnFilters);

        expect(ModalFilters).toHaveBeenCalled();
    })

    it('".cars-remove-container" / ".delete-filters-container" have been displayed', () => {
        const carsRemoveContainer = document.querySelector('.cars-remove-container') as HTMLDivElement;
        const deleteFiltersContainer = document.querySelector('.delete-filters-container') as HTMLDivElement;

        expect(carsRemoveContainer).toBeInTheDocument();
        expect(deleteFiltersContainer).toBeInTheDocument();
        expect(deleteFiltersContainer).not.toHaveClass('margin-top');
    })

    it('".cars-container" / "CarComponent" have been displayed', () => {
        const carsContainer = document.querySelector('.cars-container') as HTMLDivElement;

        expect(carsContainer).toBeInTheDocument();
        expect(carsContainer).toHaveClass('grid-filters-actived');
        expect(carsContainer).not.toHaveClass('grid-filters-disabled');
        expect(Car).toHaveBeenCalled();
    })
})

describe('first load (desktop size) / fetchStatus === "completed" / carsStatus === "succes"', () => {
    beforeAll(() => {
        window.innerWidth = desktopWidth;

        render_customState({
            ...initialState,
            cars: CARS_DB,
            fetchStatus: 'completed',
            carsStatus: 'succes',
        })
    })

    afterAll(() => cleanTest());

    it('"ModalFilters" component has been displayed', () => {
        expect(ModalFilters).toHaveBeenCalled();
    })
})

describe('first load / fetchStatus === "completed" / carsStatus === "not results"', () => {
    beforeAll(() => {
        render_customState({
            ...initialState,
            fetchStatus: 'completed',
            carsStatus: 'not results',
        })
    })

    afterAll(() => cleanTest());

    it('Error component has been displayed', () => {
        expect(Error).toHaveBeenCalled();
    })

    it('".cars-container" / Car component have not been displayed', () => {
        const carsContainer = document.querySelector('.cars-container') as HTMLDivElement;

        expect(carsContainer).not.toBeInTheDocument();
        expect(Car).not.toHaveBeenCalled();
    })
})

describe('resize window -  click event / "ModalFilters" component', () => {
    beforeAll(() => {
        window.innerWidth = mobileWidth;

        render_customState({
            ...initialState,
            cars: CARS_DB,
            fetchStatus: 'completed',
            carsStatus: 'succes',
        })
    })

    afterAll(() => cleanTest());

    it('if (window.innerWidth >= 1024) - true / ModalFilters component has been displayed', () => {

        window.innerWidth = desktopWidth;
        fireEvent.resize(window);

        expect(ModalFilters).toHaveBeenCalled();

        vi.resetAllMocks();
    })

    it('if (window.innerWidth >= 1024) - false / ModalFilters component has not been displayed', () => {
        window.innerWidth = mobileWidth;
        fireEvent.resize(window);

        expect(ModalFilters).not.toHaveBeenCalled();
    })

    it('"+ Filtros" button - click event / ModalFilters has been displayed', async () => {
        const btnOpenFilter = screen.getByText('+ Filtros');

        await userEvent.click(btnOpenFilter);

        expect(ModalFilters).toHaveBeenCalled();
    })
})
