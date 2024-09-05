import { NextRequest } from "next/server";

import { CARS_DB } from "@/db/cars";
import { mainKeyQueryParams } from "@/utils/globalVariables";
import { orderF } from "@/store/utilities";

import type { Car, MainKeyQueryParams } from "@/types";
//import { NextResponse } from "next/server";

export const revalidate = 60;

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    if (searchParams.toString() === '') return Response.json({ cars: CARS_DB });

    const keywords = searchParams.get('keywords');
    const order = searchParams.get('order');

    let allFilters = [...CARS_DB];

    if (keywords) {
        const extract = keywords.split('-');

        let preFilter: Set<Car> = new Set([]);

        //to access the car properties without validating
        type CarProperties = MainKeyQueryParams | 'model';
        const carProperties: CarProperties[] = [...mainKeyQueryParams, 'model'];

        extract.forEach(e => {
            allFilters.forEach(car => {
                if (carProperties.some(prop => car[prop].toString().toLowerCase().includes(e.toLowerCase()))) preFilter.add(car);
            });
        });

        allFilters = [...preFilter];
    }

    mainKeyQueryParams.forEach((key: MainKeyQueryParams) => {
        const values = searchParams.get(key);
    
        if (values) {
            const paramValues = values.split('-');

            allFilters = allFilters.filter(car => paramValues.includes(car[key].toString().toLowerCase()));
        }
    });

    if (order) allFilters = orderF(allFilters, order);

    return Response.json({ cars: allFilters });
}
