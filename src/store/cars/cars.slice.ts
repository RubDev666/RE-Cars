import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { Car } from '@/types';
import type { InitialState, FetchStatus, UIFilterPayload, CarsStatus } from '@/types/storeTypes';

import { extractData } from '../utilities';

export const initialState: InitialState = {
    cars: [],
    filtersOptions: {
        brands: [],
        doors: [],
        transmissions: [],
        colors: [],
        years: []
    },
    fetchStatus: 'loading',
    carsStatus: 'loading',
    keywordsParams: '',
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
        getCars: (state, action: PayloadAction<Car[] | undefined>) => {
            if (!action.payload) {
                state.fetchStatus = 'error';
                return;
            }

            state.cars = action.payload;

            if(action.payload.length > 0) state.carsStatus = 'succes';
            if(action.payload.length === 0) state.carsStatus = 'not results';

            state.fetchStatus = 'completed';
        },
        setUIFilters: (state, action: PayloadAction<UIFilterPayload>) => {
            state.UIFilters = {...state.UIFilters, [action.payload.key]: action.payload.value}
        },
        setCarsStatus: (state, action: PayloadAction<CarsStatus>) => {
            state.carsStatus = action.payload;
        }
    }
})

export const { getCars, getFilterOptions, setFetchStatus, setKeywordsParams, setUIFilters, setCarsStatus } = carsSlice.actions;
export default carsSlice.reducer;