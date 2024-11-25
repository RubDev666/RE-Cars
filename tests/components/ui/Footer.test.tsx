import {describe, expect, it,beforeAll} from 'vitest';
import {render, screen} from '@testing-library/react';

import { Footer } from '@/components';
import { socialIcons } from '@/utils/globalVariables';

describe('Footer', () => {
    beforeAll(() => {
        render(<Footer />);
    })

    it('has been displayed', () => {
        const footer = screen.getByRole('contentinfo');

        expect(footer).toBeDefined();
    })
    
    it('logo link has been displayed', () => {
        const linkRe = screen.getByText(/RE Autos/i);

        expect(linkRe.classList.contains('logo-footer')).toBeTruthy();
    })

    it('".links-container" / all links are displayed', () => {
        const footerLinks = [
            'Compra un auto',
            'Paga a meses',
            'Venta entre particulares',
            'Vende tu auto',
            'Cuida tu auto',
            'Sedes',
            'preguntas frecuentes',
            'Blog',
            'Guía de precios',
            'Testimoniales',
            'Trabaja con nosotros',
            'Contacto'
        ]

        const link0 = screen.getByText(footerLinks[0]);
        const link1 = screen.getByText(footerLinks[1]);
        const link2 = screen.getByText(footerLinks[1]);
        const link3 = screen.getByText(footerLinks[3]);
        const link4 = screen.getByText(footerLinks[4]);
        const link5 = screen.getByText(footerLinks[5]);
        const link6 = screen.getByText(footerLinks[6]);
        const link7 = screen.getByText(footerLinks[7]);
        const link8 = screen.getByText(footerLinks[8]);
        const link9 = screen.getByText(footerLinks[9]);
        const link10 = screen.getByText(footerLinks[10]);
        const link11 = screen.getByText(footerLinks[11]);

        expect(link0).toBeDefined();
        expect(link1).toBeDefined();
        expect(link2).toBeDefined();
        expect(link3).toBeDefined();
        expect(link4).toBeDefined();
        expect(link5).toBeDefined();
        expect(link6).toBeDefined();
        expect(link7).toBeDefined();
        expect(link8).toBeDefined();
        expect(link9).toBeDefined();
        expect(link10).toBeDefined();
        expect(link11).toBeDefined();
    })

    it('".icons-container" / all images are displayed', () => {
        const socialIconsScreen = screen.getAllByRole('img', {name: 'icon-img'});

        const expectedLength = socialIcons.length;

        expect(socialIconsScreen.length).toBe(expectedLength);
    })

    it('".store-container" / all images are displayed', () => {
        const storeIconsScreen = screen.getAllByRole('img', {name: 'store-img'});

        const expectedLength = 3;

        expect(storeIconsScreen.length).toBe(expectedLength);
    })

    it("Author's paragraph has been displayed / current year has been added", () => {
        const p = screen.getByText(/Created by/i);

        const currentYear = new Date().getFullYear();

        expect(p).toBeDefined();
        expect(p.textContent?.includes(`${currentYear}`)).toBeTruthy();
    })
})
