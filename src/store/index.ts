import { configureStore, Tuple } from '@reduxjs/toolkit';

import carsSlice from './cars/cars-slice';
//import { extractDataMiddleware } from './middlewares';

export const store = configureStore({
    reducer: {
        carsReducer: carsSlice
    },
    //middleware: () => new Tuple(extractDataMiddleware),
    //middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(extractData),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
