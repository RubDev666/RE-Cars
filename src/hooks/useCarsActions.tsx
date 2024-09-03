import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";

import { getCars, getFilterOptions, setFetchStatus, setKeywordsParams, setUIFilters, setCarsStatus } from "@/store/cars/cars-slice";
import { Car } from "@/types";
import { CarsStatus, FetchStatus, Params, UIFilterPayload } from "@/types/storeTypes";

export const useCarsActions = () => {
    const useAppDispatch: () => AppDispatch = useDispatch; 
    const dispatch = useAppDispatch();

    const getCarsAction = (cars: Car[] | undefined) => dispatch(getCars(cars));
    const getFilterOptionsAction = (cars: Car[] | undefined) => dispatch(getFilterOptions(cars));
    const setFetchStatusAction = (status: FetchStatus) => dispatch(setFetchStatus(status));
    const setKeywordsParamsAction = (params: string) => dispatch(setKeywordsParams(params));
    const setUIFiltersAction = (filterOption: UIFilterPayload) => dispatch(setUIFilters(filterOption));
    const setCarsStatusAction = (status: CarsStatus) => dispatch(setCarsStatus(status));

    return {
        getCarsAction, 
        getFilterOptionsAction, 
        setFetchStatusAction,
        setKeywordsParamsAction,
        setUIFiltersAction,
        setCarsStatusAction
    };
}
