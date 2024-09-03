import { useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

import { carsSelect, fetchStatusSelect, filterOptionsSelect, keywordsParamsSelect, UIFiltersSelect, carsStatusSelect } from "@/store/cars/cars.selector";
import { RootState } from "@/store";

export const useCarsSelectors = () => {
    const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

    const cars = useAppSelector(carsSelect);
    const fetchStatus = useAppSelector(fetchStatusSelect);
    const filterOptions = useAppSelector(filterOptionsSelect);
    const keywordsParams = useAppSelector(keywordsParamsSelect);
    const UIFilters = useAppSelector(UIFiltersSelect);
    const carsStatus = useAppSelector(carsStatusSelect);

    return {cars, fetchStatus, filterOptions, keywordsParams, UIFilters, carsStatus};
}
