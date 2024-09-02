import { Dispatch, SetStateAction } from "react";

export type Car = {
    id: string;
    brand: string;
    model: string;
    year: number;
    price: number;
    doors: number;
    color: string;
    transmission: string;
    urlImage: string;
}

export type MainKeyQueryParams = 'brand' | 'year' | 'doors' | 'transmission' | 'color';
export type AllKeyQueryParams = MainKeyQueryParams | 'keywords' | 'order';

export type TagParam = {
    key: MainKeyQueryParams | 'keywords';
    value: string;
}

export type FilterOptions = {
    brands: string[];
    years: number[];
    doors: number[];
    colors: string[];
    transmissions: string[];
}

export type Options = {
    [keyFil: string]: {
        bool: boolean,
        set: Dispatch<SetStateAction<boolean>>,
        keyUI: string,
        options: string[] | number[]
    }
}

export type ModalProps = {
    createURL: (key: AllKeyQueryParams, value: string) => void;
    params: URLSearchParams;
    tagsParams: TagParam[];
    setTags: Dispatch<SetStateAction<TagParam[]>>;
}

export type SearchFiltersProps = {
    openMenu: boolean;
    currentOption: string;
    setCurrentOption: Dispatch<SetStateAction<string>>;
}

export type FiltersHeaderProps = {
    resetFilters: () => void;
    btnOrder: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
