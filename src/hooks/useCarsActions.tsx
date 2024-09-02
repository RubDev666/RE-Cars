import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";

import { getCars, filter, resetFilter, getFilterOptions, setFetchStatus, setKeywordsParams, setUIFilters } from "@/store/cars/cars-slice";
import { Car } from "@/types";
import { FetchStatus, Params, UIFilterPayload } from "@/types/storeTypes";

export const useCarsActions = () => {
    const useAppDispatch: () => AppDispatch = useDispatch; 
    const dispatch = useAppDispatch();

    const getCarsAction = (cars: Car[] | undefined) => dispatch(getCars({cars, filterOptions: undefined}));
    const filterAction = (params: Params) => dispatch(filter(params));
    const resetFilterAction = () => dispatch(resetFilter());
    const getFilterOptionsAction = (cars: Car[] | undefined) => dispatch(getFilterOptions(cars));
    const setFetchStatusAction = (status: FetchStatus) => dispatch(setFetchStatus(status));
    const setKeywordsParamsAction = (params: string) => dispatch(setKeywordsParams(params));
    const setUIFiltersAction = (filterOption: UIFilterPayload) => dispatch(setUIFilters(filterOption));

    return {
        getCarsAction, 
        filterAction, 
        resetFilterAction, 
        getFilterOptionsAction, 
        setFetchStatusAction,
        setKeywordsParamsAction,
        setUIFiltersAction
    };
}
