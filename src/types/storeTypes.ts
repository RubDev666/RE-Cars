import { Car, FilterOptions } from ".";

export type FetchStatus = 'loading' | 'completed' | 'error';

export type InitialState = {
    cars: Car[];
    filtersOptions: FilterOptions;
    fetchStatus: FetchStatus;
    filtersCars: Car[];
    keywordsParams: string;
}

export type Params = {
    params: URLSearchParams;
}
