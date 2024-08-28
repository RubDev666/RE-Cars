import { CARS_DB } from "@/db/cars";
//import { NextResponse } from "next/server";

export async function GET () {
    return Response.json({cars: CARS_DB});
}
