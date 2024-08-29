import { Car, FilterOptions } from "@/types";

export function extractData(cars: Car[] | []): FilterOptions | undefined {
    if (!cars || cars.length === 0) return;

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
