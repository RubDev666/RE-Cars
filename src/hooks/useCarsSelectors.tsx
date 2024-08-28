import { useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

import { carsSelect, fetchStatusSelect, filterCarsSelect } from "@/store/cars/cars.selector";
import { RootState } from "@/store";

export const useCarsSelectors = () => {
    const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

    const cars = useAppSelector(carsSelect);
    const fetchStatus = useAppSelector(fetchStatusSelect);
    const filterCars = useAppSelector(filterCarsSelect);

    return {cars, fetchStatus, filterCars};
}