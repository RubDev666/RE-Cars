import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";

import { getCars, filter, resetFilter, getFilterOptions, changeFetchStatus, changeKeywordsParams } from "@/store/cars/cars-slice";
import { Car } from "@/types";
import { FetchStatus, Params } from "@/types/storeTypes";

export const useCarsActions = () => {
    const useAppDispatch: () => AppDispatch = useDispatch; 
    const dispatch = useAppDispatch();

    const getCarsAction = (cars: Car[] | undefined) => dispatch(getCars({cars, filterOptions: undefined}));
    const filterAction = (params: Params) => dispatch(filter(params));
    const resetFilterAction = () => dispatch(resetFilter());
    const getFilterOptionsAction = (cars: Car[] | undefined) => dispatch(getFilterOptions(cars));
    const changeFetchStatusAction = (status: FetchStatus) => dispatch(changeFetchStatus(status));
    const changeKeywordsParamsAction = (params: string) => dispatch(changeKeywordsParams(params));

    return {
        getCarsAction, 
        filterAction, 
        resetFilterAction, 
        getFilterOptionsAction, 
        changeFetchStatusAction,
        changeParamsAction: changeKeywordsParamsAction
    };
}
