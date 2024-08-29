import { Car, FilterOptions } from ".";
import { ReadonlyURLSearchParams } from "next/navigation";

export type InitialState = {
    cars: Car[];
    filtersOptions: FilterOptions;
    fetchStatus: 'loading' | 'completed' | 'error';
    filtersCars: Car[];
}

export type Params = {
    params: ReadonlyURLSearchParams;
}
