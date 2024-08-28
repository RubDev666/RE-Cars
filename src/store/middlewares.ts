import {type Middleware } from "@reduxjs/toolkit";

import { extractData } from "@/utils/filtersOptions";

export const extractDataMiddleware: Middleware = store => next => (action: any) => {
    if(!action.payload) return next(action);

    if (action.type === 'cars/getCars' && action.payload.length > 0) {
        extractData(action.payload);
    }

    next(action);
}