import { NextRequest } from "next/server";

import { CARS_DB } from "@/db/cars";
//import { NextResponse } from "next/server";

export async function GET (request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    if(searchParams.toString() === '') return Response.json({cars: CARS_DB});

    const keywords = searchParams.get('keywords');
    const order = searchParams.get('order');
    const brands = searchParams.get('brand');
    const doors = searchParams.get('doors');
    const colors = searchParams.get('color');
    const transmission = searchParams.get('transmission');
    const years = searchParams.get('year');
    
    return Response.json({cars: []});
}
