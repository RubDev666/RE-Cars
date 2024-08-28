import { Car } from ".";
import { ReadonlyURLSearchParams } from "next/navigation";

export type InitialState = {
    cars: Car[];
    fetchStatus: 'loading' | 'completed' | 'error';
    filtersCars: Car[];
}

export type Params = {
    params: ReadonlyURLSearchParams;
}
