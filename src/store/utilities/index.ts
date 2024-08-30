import { Car, FilterOptions } from "@/types";

export const orderF = (currentArr: Car[], option: string): Car[] => {
    let newOrder = currentArr;

    if (option === 'Mayor precio') {
        newOrder.sort((x, y) => y.price - x.price);
    } else if (option === 'Menor precio') {
        newOrder.sort((x, y) => x.price - y.price);
    } else if (option === 'Más antiguos') {
        newOrder.sort((x, y) => x.year - y.year);
    } else if (option === 'Más recientes') {
        newOrder.sort((x, y) => y.year - x.year);
    }

    return newOrder;
}

export function extractData(cars: Car[] | []): FilterOptions {
    let y = [];

    let brands: Set<string> = new Set();
    let doors: Set<number> = new Set();
    let transmissions: Set<string> = new Set();
    let colors: Set<string> = new Set();

    for (let car of cars) {
        brands.add(car.brand);
        y.push(car.year);
        doors.add(car.doors);
        transmissions.add(car.transmission);
        colors.add(car.color);
    }

    //To iterate the "sets" you have to put in"tsconfig" > "compilerOptions" > "target": "es6"

    y.sort((a: number, b: number) => b - a); //order the year from highest to lowest
    const years = new Set(y);

    return {
        brands: [...brands],
        doors: [...doors],
        colors: [...colors],
        transmissions: [...transmissions],
        years: [...years]
    }
}
