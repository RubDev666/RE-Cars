"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Car as CarComponent, ModalFilters, Spinner, Error, FiltersHeader } from "@/components";
import { TagParam, MainKeyQueryParams, AllKeyQueryParams } from "@/types";
import { apiUrl, mainKeyQueryParams } from "@/utils/globalVariables";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

import { useCarsSelectors } from "@/hooks/useCarsSelectors";
import { useCarsActions } from "@/hooks/useCarsActions";

export default function PreOwned() {
    const [loadingPage, setLoadingPage] = useState(true);
    const [tagsParams, setTags] = useState<TagParam[]>([]);
    const [queryParams, setQueryParams] = useState<URLSearchParams>(new URLSearchParams(''));

    const pathname = usePathname();
    const router = useRouter();

    const { fetchStatus, cars, filterCars, params: keywordsInput, UIFilters: {showFilters, modalFilters} } = useCarsSelectors();
    const { setKeywordsParamsAction, setUIFiltersAction } = useCarsActions();

    useEffect(() => {
        setQueryParams(new URLSearchParams(window.location.search));

        setLoadingPage(false);

        if (window.innerWidth >= 1024) {
            setUIFiltersAction({key: 'modalFilters', value: true});
        } else {
            setUIFiltersAction({key: 'showFilters', value: true});
        }

        addEventListener('resize', () => {
            if (window.innerWidth >= 1024) {
                setUIFiltersAction({key: 'modalFilters', value: true});
            } else {
                setUIFiltersAction({key: 'modalFilters', value: false});
                setUIFiltersAction({key: 'showFilters', value: true});
            }
        })
    }, [])

    useEffect(() => {
        if(keywordsInput !== '') createQueryString('keywords', keywordsInput);
    }, [keywordsInput])

    useEffect(() => {
        getTagParams();

        if(!loadingPage) {
            const order = queryParams.get('order');
    
            if(!order) setUIFiltersAction({key: 'orderOption', value: ''});
            if(order) setUIFiltersAction({key: 'orderOption', value: order});

            router.push('/seminuevos?' + queryParams.toString());

            getCars();
        }
    }, [queryParams])

    useEffect(() => {
        const body = document.getElementsByTagName('body');

        if (modalFilters && window.innerWidth <= 1023) {
            body[0].style.overflowY = 'hidden';
        } else {
            body[0].style.overflowY = 'auto';
        }
    }, [modalFilters])

    const getCars = async () => {
        if(!apiUrl) return;

        if(queryParams.toString() === '') {
            const cars = await fetch(apiUrl).then(res => res.json());

            console.log(cars);
        } else {
            const url = apiUrl + '?' + queryParams.toString();
            const cars = await fetch(url).then(res => res.json());

            console.log(cars);
        }
    }

    const createQueryString = useCallback(
        (key: AllKeyQueryParams, value: string) => {
            let currentParams = new URLSearchParams(queryParams);

            if(key === 'keywords') mainKeyQueryParams.forEach(key => currentParams.delete(key));

            //empty spaces in a string are represented with a '+'
            currentParams.set(key, value);

            if (key !== 'order' && key !== 'keywords') currentParams.delete('keywords');

            setQueryParams(currentParams);
        },
        [queryParams]
    )

    const btnOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
        const t = e.target as HTMLButtonElement;

        setUIFiltersAction({key: 'orderOption', value: t.value});
        setUIFiltersAction({key: 'openOrderOptions', value: false});

        createQueryString('order', t.value);
    }

    const getTagParams = () => {
        let newTags: TagParam[] = [];

        const keywords = queryParams.get('keywords');

        //avoid iterating the rest of the parameters if this is active
        if (keywords) {
            const extract = keywords.split('-');

            extract.forEach((e: string) => newTags.push({ key: 'keywords', value: e }));

            setTags(newTags);

            return;
        }

        mainKeyQueryParams.forEach((key: MainKeyQueryParams) => {
            const values = queryParams.get(key);

            if (values) {
                const extract = values.split('-');

                extract.forEach((e: string) => newTags.push({ key: key, value: e }));
            }
        })

        setTags(newTags);
    }

    const deleteParam = (tag: TagParam) => {
        const currentParams = new URLSearchParams(queryParams);

        const p = currentParams.get(tag.key);

        if (!p) return;

        if (p.includes('-')) {
            let extract = p.split('-').filter((e: string) => e !== tag.value);

            currentParams.set(tag.key, extract.join('-'));
        } else {
            currentParams.delete(tag.key);
        }

        if(!currentParams.get('keywords')) setKeywordsParamsAction('');

        setQueryParams(currentParams);
    }

    const resetFilters = () => {
        setQueryParams(new URLSearchParams(''));
        setKeywordsParamsAction('');
        setUIFiltersAction({key: 'orderOption', value: ''});
    }

    return (
        <>
            <FiltersHeader resetFilters={resetFilters} btnOrder={btnOrder} />

            {((fetchStatus === 'loading' && loadingPage) || (fetchStatus === 'loading' && !loadingPage) || (fetchStatus === 'completed' && loadingPage)) && <Spinner />}

            {(fetchStatus === 'completed' && !loadingPage) && (
                <div className={`cars-filters-container relative grid-layout-${showFilters ? 'actived' : 'disabled'}`}>
                    {(showFilters) && (
                        <div className="filters-container">
                            <button className="p-family btn-open pointer" onClick={() => setUIFiltersAction({key: 'modalFilters', value: !modalFilters})}>
                                + Filtros
                            </button>

                            {modalFilters && (
                                <ModalFilters
                                    createURL={createQueryString}
                                    params={queryParams}
                                    setTags={setTags}
                                    tagsParams={tagsParams}
                                />
                            )}
                        </div>
                    )}

                    <div className="cars-remove-container">
                        <div className={`delete-filters-container ${tagsParams.length > 0 ? 'margin-top' : ''}`}>
                            {tagsParams.map((tag: TagParam) => (
                                <button
                                    key={`${tag.key + '=' + tag.value}`}
                                    className="p-family all-center"
                                    onClick={() => deleteParam(tag)}
                                >
                                    {tag.value} <FontAwesomeIcon icon={faTimes} className="icon color-1" onClick={() => deleteParam(tag)} />
                                </button>
                            ))}
                        </div>

                        {filterCars.length === 0 && <Error title="No encontramos autos relacionados a tu búsqueda." message="Ajusta los filtros y encuentra otras opciones." />}

                        {filterCars.length > 0 && (
                            <div className={`cars-container ${showFilters ? 'grid-filters-actived' : 'grid-filters-disabled'}`}>
                                {filterCars.map((car) => (
                                    <CarComponent car={car} key={car.id} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {(fetchStatus === 'error') && <Error title="Error inesperado" message="Vuelva a cargar la pagina o intentelo mas tarde." />}
        </>
    )
}
