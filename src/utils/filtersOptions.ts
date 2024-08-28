import { Car } from "@/types";

export let brands: Set<string> = new Set();
export let years: Set<number> = new Set();
export let doors: Set<number> = new Set();
export let transmissions: Set<string> = new Set();
export let colors: Set<string> = new Set();

export function extractData(cars: Car[] | []) {
    if (!cars || cars.length === 0) return;

    let y = [];

    for (let car of cars) {
        brands.add(car.brand);
        y.push(car.year);
        doors.add(car.doors);
        transmissions.add(car.transmission);
        colors.add(car.color);
    }

    //To iterate the "sets" you have to put in"tsconfig" > "compilerOptions" > "target": "es6"

    y.sort((a: number, b: number) => b - a); //order the year from highest to lowest
    years = new Set(y);
}
