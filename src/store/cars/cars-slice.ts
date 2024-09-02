import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { Car, FilterOptions, MainKeyQueryParams } from '@/types';
import type { InitialState, Params, FetchStatus, UIFilterPayload } from '@/types/storeTypes';

import { mainKeyQueryParams } from '@/utils/globalVariables';
import { orderF, extractData} from '../utilities';

const initialState: InitialState = {
    cars: [],
    filtersOptions: {
        brands: [],
        doors: [],
        transmissions: [],
        colors: [],
        years: []
    },
    fetchStatus: 'loading',
    keywordsParams: '',
    filtersCars: [],
    UIFilters: {
        openOrderOptions: false,
        orderOption: '',
        showFilters: true,
        modalFilters: false
    }
};

export const carsSlice = createSlice({
    name: 'cars',
    initialState,
    reducers: {
        getFilterOptions: (state, action: PayloadAction<Car[] | undefined>) => {
            if(!action.payload) {
                state.fetchStatus = 'error';

                return;
            }

            const filterOptions = extractData(action.payload);

            state.filtersOptions =  filterOptions;
            state.fetchStatus = 'completed';
        },
        setFetchStatus: (state, action: PayloadAction<FetchStatus>) => {
            state.fetchStatus = action.payload;
        },
        setKeywordsParams: (state, action: PayloadAction<string>) => {
            state.keywordsParams = action.payload;
        },
        getCars: (state, action: PayloadAction<{cars: Car[] | undefined, filterOptions: FilterOptions | undefined} | undefined>) => {
            if (!action.payload || !action.payload?.cars || !action.payload?.filterOptions) {
                state.fetchStatus = 'error';
                return;
            }

            state.cars = action.payload.cars;
            state.filtersCars = action.payload.cars;
            state.filtersOptions = action.payload.filterOptions;

            state.fetchStatus = 'completed';
        },
        filter: (state, action: PayloadAction<Params>) => {
            let allFilters = state.cars;

            const params = action.payload.params;

            const keywords = params.get('keywords');
            const order = params.get('order');

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
                const values = params.get(key);
    
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
    
            state.filtersCars = allFilters;
        },
        resetFilter: (state) => {
            state.filtersCars = state.cars;
        },
        setUIFilters: (state, action: PayloadAction<UIFilterPayload>) => {
            state.UIFilters = {...state.UIFilters, [action.payload.key]: action.payload.value}
        }
    }
})

export const { getCars, filter, resetFilter, getFilterOptions, setFetchStatus, setKeywordsParams, setUIFilters } = carsSlice.actions;
export default carsSlice.reducer;