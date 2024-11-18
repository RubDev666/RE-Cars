import { it, expect, describe, vi, beforeAll, beforeEach, afterAll } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { screen, fireEvent, cleanup } from '@testing-library/react';
import { renderWithProviders } from '../../setUp';
import * as nextNavigation from 'next/navigation';
import {userEvent} from '@testing-library/user-event';

import { Searcher } from '@/components';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const pushMock = vi.fn();

vi.mock('next/navigation', () => ({
    usePathname: () => '/',
    useRouter: () => ({
        push: pushMock
    })
}))

vi.mock('@fortawesome/react-fontawesome', () => ({ 
    FontAwesomeIcon: ({className, icon}: {className: string | undefined, icon: IconProp}) => <div className={className} >FontAwesomeIconMock</div> 
}));

describe('Searcher()', () => {
    beforeAll(() => {
        renderWithProviders(<Searcher />);
    })

    it('form element has been displayed / it should have "border-disabled" class and should not have "border-active" class at beginning', () => {
        const form = screen.getByRole('form');

        expect(form).toBeInTheDocument();
        expect(form).toHaveClass('border-disabled');
        expect(form).not.toHaveClass('border-active');
    })
    
    it('label and button submit has been displayed', () => {
        const label = screen.getByTestId('label-search');
        const btn = screen.getByRole('button');

        expect(label).toBeInTheDocument();
        expect(btn).toBeInTheDocument();
    })

    it('"FontAwesomeIcon" has been displayed / should have "icon-disabled" class', () => {
        const fontAwesomeMock = screen.getByText('FontAwesomeIconMock');

        expect(fontAwesomeMock).toBeInTheDocument();
        expect(fontAwesomeMock).toHaveClass('icon-disabled');
    })

    it('input has been displayed', () => {
        const input = screen.getByPlaceholderText('Buscar por marca, modelo, año, etc.');

        expect(input).toBeInTheDocument();
    })

    it('click event in label element / The form and "FontAwesomeIcon" classes have been changed successfully', () => {
        const label = screen.getByTestId('label-search');
        const form = screen.getByRole('form');
        const fontAwesomeMock = screen.getByText('FontAwesomeIconMock');

        fireEvent.click(label);

        expect(form).toHaveClass('border-active');
        expect(form).not.toHaveClass('border-disabled');
        expect(fontAwesomeMock).toHaveClass('icon-active');
        expect(fontAwesomeMock).not.toHaveClass('icon-disabled');
    })

    it('blur event in form / The form classes have been changed successfully', () => {
        const form = screen.getByRole('form');
        const fontAwesomeMock = screen.getByText('FontAwesomeIconMock');

        fireEvent.blur(form);

        expect(form).toHaveClass('border-disabled');
        expect(form).not.toHaveClass('border-active');
        expect(fontAwesomeMock).not.toHaveClass('icon-active');
        expect(fontAwesomeMock).toHaveClass('icon-disabled');
    })

    it('the input change event works', async () => {
        const input = screen.getByPlaceholderText('Buscar por marca, modelo, año, etc.');
        const userSearch = 'chevrolet';

        fireEvent.change(input, {target: {value: userSearch}});

        expect(input).toHaveValue(userSearch);
    })
})

describe('Searcher() / submit event', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        cleanup();

        renderWithProviders(<Searcher />);
    })

    const submitSimulation = async (userSearch: string) => {
        const input = screen.getByPlaceholderText('Buscar por marca, modelo, año, etc.');
        const btnSubmit = screen.getByRole('button');

        //fireEvent.change(input, {target: {value: userSearch}});
        //fireEvent.submit(btnSubmit);

        await userEvent.type(input, userSearch);
        await userEvent.click(btnSubmit);
    }

    it('submit event with pathname = "/" / "useCarsActions" should not be called / "router.push" should be called', async () => {
        const searchExpected = 'ford';

        await submitSimulation(searchExpected);

        expect(pushMock).toHaveBeenCalledWith('/seminuevos?keywords=' + searchExpected);
    })

    it('submit event with pathname = "/seminuevos" / "useCarsActions" should be called / "router.push" should not be called', async () => {
        vi.spyOn(nextNavigation, 'usePathname').mockImplementation(() => '/seminuevos');

        await submitSimulation('land rover');

        expect(pushMock).not.toHaveBeenCalled();
    })
})
