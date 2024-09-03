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

export const filterOptionsSelect = createSelector(
    [selectState],
    (state) => state.filtersOptions
)

export const keywordsParamsSelect = createSelector(
    [selectState],
    (state) => state.keywordsParams
)

export const UIFiltersSelect = createSelector(
    [selectState],
    (state) => state.UIFilters
)

export const carsStatusSelect = createSelector(
    [selectState],
    (state) => state.carsStatus
)