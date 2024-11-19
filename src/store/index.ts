import { configureStore, Tuple, combineReducers } from '@reduxjs/toolkit';

import carsSlice from './cars/cars.slice';
//import { extractDataMiddleware } from './middlewares';

/*export const store = configureStore({
    reducer: {
        carsReducer: carsSlice
    },
    //middleware: () => new Tuple(extractDataMiddleware),
    //middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(extractData),
})*/

export const rootReducer = combineReducers({
    carsReducer: carsSlice
})

export function setupStore(preloadedState?: Partial<RootState>) {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    })
}

//export type RootState = ReturnType<typeof store.getState>;
//export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch'];
