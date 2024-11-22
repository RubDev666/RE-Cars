import { it, expect, describe, vi, beforeAll, afterAll } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { screen, cleanup } from '@testing-library/react';

import { renderWithProviders } from '../../setUp';
import { SearchFiltersCont } from '@/components';
import { initialState } from '@/store/cars/cars.slice';

vi.mock('@fortawesome/react-fontawesome');
vi.mock('next/navigation');

describe('first load / fetchStatus === "loading" / pathname === "/"', () => {
    beforeAll(() => {
        renderWithProviders(<SearchFiltersCont openMenu={false} currentOption='' setCurrentOption={vi.fn()} />);
    })

    afterAll(() => {
        cleanup();
    })

    it('".search-filters-container" / should not have the class "none" / should have the class "items-between"', () => {
        const searchFiltersContainer = document.querySelector('.search-filters-container') as HTMLDivElement;

        expect(searchFiltersContainer).toBeInTheDocument();
        expect(searchFiltersContainer).toHaveClass('items-between');
        expect(searchFiltersContainer).not.toHaveClass('none');
    })

    it('".search-container" / should not have the class "none" / should have the class "block"', () => {
        const searchContainer = document.querySelector('.search-container') as HTMLDivElement;

        expect(searchContainer).toBeInTheDocument();
        expect(searchContainer).toHaveClass('block');
        expect(searchContainer).not.toHaveClass('none');
    })

    it('".filter-header-container" / should have the class "none" / should not have the class "block"', () => {
        const filterHeaderContainer = document.querySelector('.filter-header-container') as HTMLDivElement;

        expect(filterHeaderContainer).toBeInTheDocument();
        expect(filterHeaderContainer).toHaveClass('none');
        expect(filterHeaderContainer).not.toHaveClass('block');
    })

    it('"Skeleton" component has been displayed / fetchstatus loading', () => {
        const skeletons = screen.getAllByRole('status');

        expect(skeletons.length).toBe(5);
    })

    it('btnFilters have not been displayed', () => {
        const btnFilters = document.getElementsByClassName('.btn-filter') as HTMLCollectionOf<HTMLButtonElement>;

        expect(btnFilters.length).toBe(0);
    })

    it('".options-container" ', () => {
        const optionsContainer = document.querySelector('.options-container') as HTMLDivElement;

        expect(optionsContainer).toBeInTheDocument();
        expect(optionsContainer).toHaveClass('none');
        expect(optionsContainer).not.toHaveClass('block');
    })
})

describe('first load / fetchStatus === "completed" / pathname === "/"', () => {
    beforeAll(() => {
        //vi.spyOn(nextNavigation, 'usePathname').mockImplementation(() => '/seminuevos');

        renderWithProviders(<SearchFiltersCont openMenu={false} currentOption='' setCurrentOption={vi.fn()} />, {
            preloadedState: {
                carsReducer: {
                    ...initialState,
                    fetchStatus: 'completed',
                    filtersOptions: {
                        brands: ['chevrolet', 'audi'],
                        years: [2024, 2023],
                        doors: [2, 4],
                        colors: ['black', 'blue'],
                        transmissions: ['manual', 'automatico']
                    }
                }
            }
        });
    })

    afterAll(() => {
        cleanup();
    })

    const expect_btnFilter = (name: 'marca' | 'año' | 'puertas' | 'transmision') => {
        const keyName = `.test-${name}`;

        const btnFilter = document.querySelector(`.btn-filter${keyName}`) as HTMLButtonElement;
        const iconBtn = document.querySelector(`${keyName} .icon-pc`) as HTMLSpanElement;

        expect(btnFilter).toBeInTheDocument();
        expect(btnFilter).toHaveClass('color-4');
        expect(btnFilter).not.toHaveClass('color-1');
        expect(iconBtn).toHaveClass('angle-down');
        expect(iconBtn).not.toHaveClass('angle-up');
    }

    it('paragraph "Filtrar por:" has been displayed', () => {
        const p = screen.getByText('Filtrar por:');

        expect(p).toBeInTheDocument();
    })

    it('btnFilters have been displayed', () => {
        expect_btnFilter('año');
        expect_btnFilter('marca');
        expect_btnFilter('puertas');
        expect_btnFilter('transmision');
    })
})
