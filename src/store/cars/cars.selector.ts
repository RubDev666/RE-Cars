import { createSelector, lruMemoize, createSelectorCreator } from 'reselect';
import { shallowEqual } from 'react-redux';

import type { RootState } from '..';

const selectState = (state: RootState) => state.carsReducer;

export const carsSelect = createSelector(
    [selectState],
    (state) => state.cars
)

export const fetchStatusSelect = createSelector(
    [selectState],
    (state) => state.fetchStatus
)

export const filterCarsSelect = createSelector(
    [selectState],
    (state) => state.filtersCars
)
