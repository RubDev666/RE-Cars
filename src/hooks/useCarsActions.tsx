import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";

import { getCars, filter, resetFilter } from "@/store/cars/cars-slice";
import { Car } from "@/types";
import { Params } from "@/types/storeTypes";

export const useCarsActions = () => {
    const useAppDispatch: () => AppDispatch = useDispatch; 
    const dispatch = useAppDispatch();

    const getCarsAction = (cars: Car[] | undefined) => dispatch(getCars(cars));
    const filterAction = (params: Params) => dispatch(filter(params));
    const resetFilterAction = () => dispatch(resetFilter());

    return {getCarsAction, filterAction, resetFilterAction};
}
