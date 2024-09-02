import { Car, FilterOptions } from ".";

export type FetchStatus = 'loading' | 'completed' | 'error';

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
    filtersCars: Car[];
    keywordsParams: string;
    UIFilters: Record<UIFilterOptions, UIFilterValues>;
}

export type Params = {
    params: URLSearchParams;
}
