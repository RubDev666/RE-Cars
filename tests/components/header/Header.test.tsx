import { it, expect, describe, vi, beforeAll, afterAll, afterEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { screen, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '../../setUp';
import { Header } from '@/components';
import { CARS_DB } from '@/db/cars';
import { SearchFiltersCont } from "@/components";

import * as nextNavigation from 'next/navigation';

vi.mock('next/navigation', () => ({
    usePathname: () => '/',
    useRouter: () => ({
        push: vi.fn()
    })
}))

vi.mock('@fortawesome/react-fontawesome', () => ({ 
    FontAwesomeIcon: ({className, icon, onClick}: {className: string | undefined, icon: any, onClick: () => void}) => {
        //console.log(icon.iconName);

        return(
            <span className={className + ' ' + icon.iconName} onClick={onClick} >FontAwesomeIconMock</span> 
        )
    }
}));

vi.mock('@/components', {spy: true});

const expect_nav_logoContainer = (openMenu: true | false) => {
    const logoContainer = document.querySelector('.logo-container') as HTMLDivElement;
    const navElement = screen.getByRole('navigation');

    switch (openMenu) {
        case false: {
            expect(logoContainer).not.toHaveClass('active');
            expect(navElement).not.toHaveClass('show');

            break;
        }
        case true: {
            expect(logoContainer).toHaveClass('active');
            expect(navElement).toHaveClass('show');

            break;
        }
        default:
            break;
    }
}

const createBtnSelector = (typeBtn: 'close' | 'open') => document.querySelector(`.test-btn-${typeBtn}-menu`) as HTMLSpanElement;

const handleClickBtnMenu = async (typeBtn: 'close' | 'open') => {
    const btnClick = createBtnSelector(typeBtn);

    await userEvent.click(btnClick);

    return {
        btnNew: typeBtn === 'open' ? createBtnSelector('close') : createBtnSelector('open'), 
        btnClick
    }
}

const accordionSelectors = (name: 'us' | 'help') => {
    return {
        mainContainer: document.querySelector(`.${name}-accordion`) as HTMLDivElement,
        accordion: document.querySelector(`.${name}-accordion .accordion`) as HTMLDivElement,
        btnAction: name === 'us' ? screen.getByText('Nosotros') : screen.getByText('Ayuda'),
        btnIcon: document.querySelector(`.test-icon-${name}`) as HTMLSpanElement
    }
}

const expect_accordions = (name: 'us' | 'help', open: true | false) => {
    const {accordion, btnIcon, btnAction, mainContainer} = accordionSelectors(name);

    expect(mainContainer).toBeInTheDocument();
    expect(btnAction).toBeInTheDocument();

    switch (open) {
        case true: {
            expect(btnAction).not.toHaveClass('color-4');
            expect(btnAction).toHaveClass('color-1');
            expect(accordion).toBeInTheDocument();
            expect(btnIcon).not.toHaveClass('angle-down');
            expect(btnIcon).toHaveClass('angle-up');

            if(name === 'us') {
                const link1 = screen.getByText('Sedes');
                const link2 = screen.getByText('Guía de precios');
                const link3 = screen.getByText('Testimoniales');
                const link4 = screen.getByText('Blog');

                expect(link1).toBeInTheDocument();
                expect(link2).toBeInTheDocument();
                expect(link3).toBeInTheDocument();
                expect(link4).toBeInTheDocument();                
            } else {
                const link1 = screen.getByText('Preguntas frecuentes');
                const link2 = screen.getByText('Contacto');

                expect(link1).toBeInTheDocument();
                expect(link2).toBeInTheDocument();
            }

            break;
        }
        case false: {
            expect(btnAction).toHaveClass('color-4');
            expect(btnAction).not.toHaveClass('color-1');
            expect(accordion).not.toBeInTheDocument();
            expect(btnIcon).toHaveClass('angle-down');
            expect(btnIcon).not.toHaveClass('angle-up');

            break;
        }
        default:
            break;
    }
}

beforeAll(() => {
    window.innerWidth = 900; //mobile size
})

describe('first load rendering', () => {
    beforeAll(() => {
        renderWithProviders(<Header data={{cars: CARS_DB}} />);
    })

    afterAll(() => {
        cleanup();
    })

    it('static elements has been displayed', () => {
        const header = screen.getByRole('banner');
        const logoNavbarContainer = document.querySelector('.logo-navbar-container');
        const logoLink = screen.getByText('RE Autos');

        const loginContainer = document.querySelector('.login-container') as HTMLDivElement;
        const p1 = screen.getByText(/te damos/i);
        const p2 = screen.getByText(/crea una/i);
        const btn = screen.getByText('Ingresar');

        const link1 = screen.getByText(/paga a/i);
        const link2 = screen.getByText(/compra un/i);
        const link3 = screen.getByText(/vende tu/i);

        expect(header).toBeInTheDocument();
        expect(logoNavbarContainer).toBeInTheDocument();
        expect(logoLink).toBeInTheDocument();

        expect(loginContainer).toBeInTheDocument();
        expect(p1).toBeInTheDocument();
        expect(p2).toBeInTheDocument();
        expect(btn).toBeInTheDocument();

        expect(link1).toBeInTheDocument();
        expect(link2).toBeInTheDocument();
        expect(link3).toBeInTheDocument();

        expect(SearchFiltersCont).toHaveBeenCalled();
    })

    it('".logo-container" has been displayed / should not have "active" class', () => {
        const logoContainer = document.querySelector('.logo-container');

        expect(logoContainer).toBeInTheDocument();
        expect(logoContainer).not.toHaveClass('active');
    })

    it('"FontAwesomeIcon" / open icon has been displayed / close icon should not have been displayed', () => {
        const btnOpenMenu = createBtnSelector('open');
        const btnCloseMenu = createBtnSelector('close');

        expect(btnOpenMenu).toBeInTheDocument();
        expect(btnCloseMenu).not.toBeInTheDocument();
    })
})

describe('"openMenu" state', () => {
    beforeAll(() => {
        renderWithProviders(<Header data={{cars: CARS_DB}} />);
    })

    afterAll(() => {
        cleanup();
    })

    const expect_menuButtons = async (status: 'open' | 'close') => {
        const {btnClick, btnNew} = await handleClickBtnMenu(status);
        
        expect(btnClick).not.toBeInTheDocument();
        expect(btnNew).toBeInTheDocument();
    }

    it('"btnOpenMenu" - click event / if "openMenu" is true, "btnOpenMenu" should disappear / "btnCloseMenu" should appear', async () => {
        await expect_menuButtons('open');
    })

    it('if "openMenu" is true / ".logo-container" should have class "active" / nav element should have class "show"', () => {
        expect_nav_logoContainer(true);
    })

    it('"btnCloseMenu" - click event / if "openMenu" is false, "btnCloseMenu" should disappear / "btnOpenMenu" should appear', async () => {
        await expect_menuButtons('close');
    })

    it('if "openMenu" is false / ".logo-container" should not have class "active" / nav element should not have class "show"', () => {
        expect_nav_logoContainer(false);
    })
})

describe('accordions ("usAccordion" and "helpAccordion" states)', () => {
    beforeAll(() => {
        renderWithProviders(<Header data={{cars: CARS_DB}} />);
    })

    afterAll(() => {
        cleanup();
    })

    it('".links-accordion" / "cuida tu auto" link has been displayed', () => {
        const linksAccordion = document.querySelector('.links-accordion') as HTMLDivElement;
        const mainLink = screen.getByText('Cuida tu auto');

        expect(linksAccordion).toBeInTheDocument();
        expect(mainLink).toBeInTheDocument();
    })

    it('".us-accordion" / "Nosotros" button has been displayed and should have the class "color-4" / ".accordion" has not been displayed', () => {
        expect_accordions('us', false);
    })

    it('".help-accordion" / "Ayuda" button has been displayed and should have the class "color-4" / ".accordion" has not been displayed', () => {
        expect_accordions('help', false);
    })

    it('"usAccordion" is true / click event', async () => {
        const {btnAction: usBtn} = accordionSelectors('us');

        await userEvent.click(usBtn);

        expect_accordions('us', true);
    })

    it('"usAccordion" is false / click event', async () => {
        const {btnAction: usBtn} = accordionSelectors('us');

        await userEvent.click(usBtn);

        expect_accordions('us', false);
    })

    it('"helpAccordion" is true / click event', async () => {
        const {btnAction: helpBtn} = accordionSelectors('help');

        await userEvent.click(helpBtn);

        expect_accordions('help', true);
    })

    it('"helpAccordion" is false / click event', async () => {
        const {btnAction: helppBtn} = accordionSelectors('help');

        await userEvent.click(helppBtn);

        expect_accordions('help', false);
    })
})

describe('resize event', () => {
    beforeAll(() => {
        renderWithProviders(<Header data={{cars: CARS_DB}} />);
    })

    afterAll(() => {
        cleanup();
    })

    it('if (window.innerWidth >= 1024) === false / The elements should not change', async () => {
        const {btnClick: btnOpen, btnNew: btnClose} = await handleClickBtnMenu('open');
        const {btnAction: usBtn} = accordionSelectors('us');
        const {btnAction: helpBtn} = accordionSelectors('help');

        await userEvent.click(usBtn);
        await userEvent.click(helpBtn);

        window.innerWidth = 1000;
        fireEvent.resize(window);

        expect(btnOpen).not.toBeInTheDocument();
        expect(btnClose).toBeInTheDocument();

        expect_nav_logoContainer(true);
        expect_accordions('us', true);
        expect_accordions('help', true);
    })

    it('if (window.innerWidth >= 1024) === true / The elements should change', async () => {
        //At this point, the click event is still active.

        window.innerWidth = 1100;
        fireEvent.resize(window);

        const btnOpen = createBtnSelector('open');
        const btnClose = createBtnSelector('close');

        expect(btnOpen).toBeInTheDocument();
        expect(btnClose).not.toBeInTheDocument();

        expect_nav_logoContainer(false);
        expect_accordions('us', false);
        expect_accordions('help', false);
    })
})

describe('pathname / first load', () => {
    afterEach(() => {
        cleanup();
    })

    const expect_nav = (pathname: '/' | '/seminuevos') => {
        renderWithProviders(<Header data={{cars: CARS_DB}} />);

        const navElement = screen.getByRole('navigation');
        
        expect(navElement).toBeInTheDocument();
        expect(navElement).not.toHaveClass('show');
        expect(navElement).not.toHaveClass(pathname === '/' ? 'mobile-pre-owned' : 'mobile');
        expect(navElement).toHaveClass(pathname === '/' ? 'mobile' : 'mobile-pre-owned');
    }

    it('nav element with pathname === "/" / Should not have the classes "show" and "mobile-pre-owned" / should have the "mobile" class', () => {
        expect_nav('/');
    })

    it('nav element with pathname === "/seminuevos" / Should not have the classes "show" and "mobile" / should have the "mobile-pre-owned" class', () => {
        vi.spyOn(nextNavigation, 'usePathname').mockImplementation(() => '/seminuevos');

        expect_nav('/seminuevos');
    })
})
