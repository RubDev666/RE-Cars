/*import {type Middleware } from "@reduxjs/toolkit";

import { extractData } from "@/utils/filtersOptions";

export const extractDataMiddleware: Middleware = store => next => (action: any) => {
    if(!action.payload) return next(action);

    const filterOptions = extractData(action.payload.cars);

    if (action.type === 'cars/getFilterOptions' && filterOptions) {
        action.payload = {cars: action.payload.cars, filterOptions};

        next(action);
    }

    //next(action);
}*/