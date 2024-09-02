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

export const filterOptionsSelect = createSelector(
    [selectState],
    (state) => state.filtersOptions
)

export const paramsSelect = createSelector(
    [selectState],
    (state) => state.keywordsParams
)

export const UIFiltersSelect = createSelector(
    [selectState],
    (state) => state.UIFilters
)
