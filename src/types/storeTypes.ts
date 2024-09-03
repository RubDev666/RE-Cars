import { Car, FilterOptions } from ".";

export type FetchStatus = 'loading' | 'completed' | 'error';
export type CarsStatus = 'not results' | 'succes' | 'loading';

type UIFilterOptions = 'openOrderOptions' | 'orderOption' | 'showFilters' | 'modalFilters';
type UIFilterValues = string | boolean;

export type UIFilterPayload = {
    key: UIFilterOptions;
    value: UIFilterValues;
}

export type InitialState = {
    cars: Car[];
    filtersOptions: FilterOptions;
    fetchStatus: FetchStatus;
    keywordsParams: string;
    UIFilters: Record<UIFilterOptions, UIFilterValues>;
    carsStatus: CarsStatus;
}

export type Params = {
    params: URLSearchParams;
}
