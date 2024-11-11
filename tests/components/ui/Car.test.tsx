import { it, expect, describe, beforeAll } from 'vitest';
import {render, screen} from '@testing-library/react';

import { Car } from '@/components';
import type { Car as CarTypes } from "@/types";

describe('Car({ car }: { car: CarTypes })', () => {
    const carTest: CarTypes = {
        id: "29",
        brand: 'Jeep',
        model: 'Compass',
        year: 2023,
        price: 96000,
        doors: 4,
        color: 'gris',
        transmission: 'automatico',
        urlImage: 'https://res.cloudinary.com/dkav9fvlo/image/upload/v1725550384/Venta%20de%20autos%20-%20Proyecto/wntwdb8takltr48cxyzk.jpg'
    }

    beforeAll(() => {
        render(<Car car={carTest} />);
    })

    it('has been displayed', () => {
        const carContainer = screen.getAllByRole('article');

        expect(carContainer).toBeDefined();
    })

    it('car image has been displayed', () => {
        const imgCar = screen.getByRole('img');

        expect(imgCar).toBeDefined();
        expect(imgCar.getAttribute('src')).not.toBe('');
    })

    it('".car-info" / all information has been displayed', () => {
        const brandModelText = screen.getByText(`${carTest.brand} - ${carTest.model}`);
        const additionalText = screen.getByText(`${carTest.year} • ${carTest.transmission} • ${carTest.doors} Puertas`);

        expect(brandModelText).toBeDefined();
        expect(additionalText).toBeDefined();
    })

    it('".car-price" / all information has been displayed', () => {
        const priceText = screen.getByText(`$${carTest.price}`);
        const minimumText = screen.getByText('Desde $3,000/mes*');

        expect(priceText).toBeDefined();
        expect(minimumText).toBeDefined();
    })
})
