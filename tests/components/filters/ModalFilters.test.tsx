import { it, expect, describe, vi, beforeAll, afterAll } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '../../setUp';
import { ModalFilters } from '@/components';
import type { MainKeyQueryParams } from '@/types';

vi.mock('@fortawesome/react-fontawesome');

beforeAll(() => {
    const searchParams: any = vi.fn();

    renderWithProviders(<ModalFilters createURL={vi.fn()} params={searchParams} tagsParams={[]} />);
})

afterAll(() => {
    cleanup();
})

const accordionSelectors = (name: MainKeyQueryParams) => {
    const key = `.test-${name}`;

    const accordionContainer = document.querySelector(`.accordion-container${key}`) as HTMLDivElement;
    const btnAccordion = document.querySelector(`.btn-action${key}`) as HTMLButtonElement;
    const iconBtn = document.querySelector(`.btn-action${key} .icon-filter`) as HTMLSpanElement;
    const options = document.querySelector(`.accordion-container${key} .options`) as HTMLDivElement;

    return {
        accordionContainer,
        btnAccordion,
        iconBtn,
        options
    }
}

describe('ModalFilters component / first load', () => {
    const expect_accordions = (name: MainKeyQueryParams) => {
        const {accordionContainer, btnAccordion,iconBtn, options} = accordionSelectors(name);

        expect(accordionContainer).toBeInTheDocument();

        expect(btnAccordion).toBeInTheDocument();
        expect(btnAccordion).toHaveClass('color-4');
        expect(btnAccordion).not.toHaveClass('color-1');
        
        expect(iconBtn).toBeInTheDocument();
        expect(iconBtn).toHaveClass('angle-down');
        expect(iconBtn).not.toHaveClass('angle-up');

        expect(options).not.toBeInTheDocument();
    }

    it('static elements have benn displayed', () => {
        const modalContainer = document.querySelector('.modal-container') as HTMLDivElement;
        const filtersMobile = document.querySelector('.filters-mobile') as HTMLDivElement;
        const actions = document.querySelector('.actions') as HTMLDivElement;
        const pFilters = screen.getByText('Filtros');
        const cleanLink = screen.getByText('Limpiar');
        const filters = document.querySelector('.filters') as HTMLDivElement;
        const btnShow = screen.getByText('Mostrar resultados');

        expect(modalContainer).toBeInTheDocument();
        expect(filtersMobile).toBeInTheDocument();
        expect(actions).toBeInTheDocument();
        expect(pFilters).toBeInTheDocument();
        expect(cleanLink).toBeInTheDocument();
        expect(filters).toBeInTheDocument();
        expect(btnShow).toBeInTheDocument();
    })

    it('".btn-close" has been displayed / has the "faTimes" icon', () => {
        const btnClose = document.querySelector('.btn-close') as HTMLButtonElement;
        const icon = document.querySelector('.xmark') as HTMLSpanElement;

        expect(btnClose).toBeInTheDocument();
        expect(icon).toBeInTheDocument();
    })

    it('accordions have been successfully displayed', () => {
        expect_accordions('brand');
        expect_accordions('color');
        expect_accordions('doors');
        expect_accordions('transmission');
        expect_accordions('year');
    })
})

describe('open - close filter options / click event', () => {
    const expect_accordionAction = async (name: MainKeyQueryParams, status: 'open' | 'close') => {
        const {btnAccordion,iconBtn} = accordionSelectors(name);

        await userEvent.click(btnAccordion);

        const {options} = accordionSelectors(name);

        const btnClassRemoved = status === 'open' ? 'color-4' : 'color-1';
        const btnClassAdded = status === 'open' ? 'color-1' : 'color-4';
        const btnIconRemoved = status === 'open' ? 'angle-dow2' : 'angle-up';
        const btnIconAdded = status === 'open' ? 'angle-up' : 'angle-down';

        expect(btnAccordion).toHaveClass(btnClassAdded);
        expect(btnAccordion).not.toHaveClass(btnClassRemoved);
        expect(iconBtn).toHaveClass(btnIconAdded);
        expect(iconBtn).not.toHaveClass(btnIconRemoved);

        if(status === 'open') {
            expect(options).toBeInTheDocument();
        } else {
            expect(options).not.toBeInTheDocument();   
        }
    }

    it('open options', async () => {
        await expect_accordionAction('brand', 'open');
        await expect_accordionAction('color', 'open');
        await expect_accordionAction('doors', 'open');
        await expect_accordionAction('transmission', 'open');
        await expect_accordionAction('year', 'open');
    })

    it('close options', async () => {
        await expect_accordionAction('brand', 'close');
        await expect_accordionAction('color', 'close');
        await expect_accordionAction('doors', 'close');
        await expect_accordionAction('transmission', 'close');
        await expect_accordionAction('year', 'close');
    })
})
