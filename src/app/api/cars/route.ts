import { NextRequest } from "next/server";

import { CARS_DB } from "@/db/cars";
import { mainKeyQueryParams } from "@/utils/globalVariables";
import { orderF } from "@/store/utilities";

import type { Car, MainKeyQueryParams } from "@/types";
//import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    if (searchParams.toString() === '') return Response.json({ cars: CARS_DB });

    const keywords = searchParams.get('keywords');
    const order = searchParams.get('order');
    const brands = searchParams.get('brand');
    const doors = searchParams.get('doors');
    const colors = searchParams.get('color');
    const transmission = searchParams.get('transmission');
    const years = searchParams.get('year');

    let allFilters = CARS_DB;

    if (keywords) {
        const extract = keywords.split('-');

        let preFilter: Car[] = [];
        let idCars: string[] = [];

        //to access the car properties without validating
        type CarProperties = MainKeyQueryParams | 'model';
        const carProperties: CarProperties[] = [...mainKeyQueryParams, 'model'];

        extract.forEach((e: string) => {
            for (let i = 0; i < carProperties.length; i++) {
                for (let car of allFilters) {
                    if (car[carProperties[i]].toString().toLowerCase().includes(e.toLowerCase()) && !idCars.includes(car.id)) {
                        preFilter.push(car);
                        idCars.push(car.id);
                    }
                }
            }
        })

        allFilters = preFilter;
    }

    mainKeyQueryParams.forEach((key: MainKeyQueryParams) => {
        const values = searchParams.get(key);

        if (values) {
            if (values.includes('-')) {
                const paramValues = values.split('-');

                let preFilter: Car[] = [];

                for (let value of paramValues) {
                    const newFilters = allFilters.filter((car: Car) => car[key].toString().toLowerCase() === value);

                    for (let item of newFilters) {
                        preFilter.push(item);
                    }
                }

                allFilters = preFilter;
            } else {
                allFilters = allFilters.filter((car: Car) => car[key].toString().toLowerCase() === values);
            }
        }
    });

    if (order) allFilters = orderF(allFilters, order);

    return Response.json({ cars: allFilters });
}
