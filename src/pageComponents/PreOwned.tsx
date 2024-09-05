"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Car as CarComponent, ModalFilters, Spinner, Error, FiltersHeader } from "@/components";
import type { TagParam, MainKeyQueryParams, AllKeyQueryParams } from "@/types";
import { apiUrl, mainKeyQueryParams } from "@/utils/globalVariables";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

import { useCarsSelectors } from "@/hooks/useCarsSelectors";
import { useCarsActions } from "@/hooks/useCarsActions";

export default function PreOwned() {
    const [loadingPage, setLoadingPage] = useState(true);
    const [tagsParams, setTags] = useState<TagParam[]>([]);

    const router = useRouter();
    const searchParams = useSearchParams();

    const { fetchStatus, cars, keywordsParams, UIFilters: {showFilters, modalFilters}, carsStatus } = useCarsSelectors();
    const { setKeywordsParamsAction, setUIFiltersAction, getCarsAction } = useCarsActions();

    useEffect(() => {
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
        const order = searchParams.get('order');

        if(!loadingPage) {    
            if(!order) setUIFiltersAction({key: 'orderOption', value: ''});
            if(order) setUIFiltersAction({key: 'orderOption', value: order});

            getCars();
        }
    }, [searchParams, loadingPage])

    useEffect(() => {
        if(keywordsParams !== '') createQueryString('keywords', keywordsParams);
    }, [keywordsParams])

    useEffect(() => {
        const body = document.getElementsByTagName('body');

        if (modalFilters && window.innerWidth <= 1023) {
            body[0].style.overflowY = 'hidden';
        } else {
            body[0].style.overflowY = 'auto';
        }
    }, [modalFilters])

    const getCars = async () => {
        if (!apiUrl) return;

        if (searchParams.toString() === '') {
            const res = await fetch(apiUrl).then(res => res.json());

            getCarsAction(res.cars);
        } else {
            const res = await fetch(apiUrl + '?' + searchParams.toString()).then(res => res.json());

            getCarsAction(res.cars);
        }

        getTagParams();

        window.scrollTo({
            top: 0,
            left: 0,
        });
    }

    const createQueryString = useCallback(
        (key: AllKeyQueryParams, value: string) => {
            let currentParams = new URLSearchParams(searchParams.toString());

            if(key === 'keywords') mainKeyQueryParams.forEach(key => currentParams.delete(key));

            //empty spaces in a string are represented with a '+'
            currentParams.set(key, value);

            if (key !== 'order' && key !== 'keywords') currentParams.delete('keywords');

            router.push('/seminuevos?' + currentParams.toString(), { scroll: false });
        },
        [searchParams]
    )

    const btnOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
        const t = e.target as HTMLButtonElement;

        setUIFiltersAction({key: 'orderOption', value: t.value});
        setUIFiltersAction({key: 'openOrderOptions', value: false});

        createQueryString('order', t.value);
    }

    const getTagParams = () => {
        let newTags: TagParam[] = [];

        const keywords = searchParams.get('keywords');

        //avoid iterating the rest of the parameters if this is active
        if (keywords) {
            const extract = keywords.split('-');

            extract.forEach((e: string) => newTags.push({ key: 'keywords', value: e }));

            setTags(newTags);

            return;
        }

        mainKeyQueryParams.forEach((key: MainKeyQueryParams) => {
            const values = searchParams.get(key);

            if (values) {
                const extract = values.split('-');

                extract.forEach((e: string) => newTags.push({ key: key, value: e }));
            }
        })

        setTags(newTags);
    }

    const deleteParam = (tag: TagParam) => {
        const currentParams = new URLSearchParams(searchParams);

        const p = currentParams.get(tag.key);

        if (!p) return;

        if (p.includes('-')) {
            let extract = p.split('-').filter((e: string) => e !== tag.value);

            currentParams.set(tag.key, extract.join('-'));
        } else {
            currentParams.delete(tag.key);
        }

        if(!currentParams.get('keywords')) setKeywordsParamsAction('');

        router.push('/seminuevos?' + currentParams.toString());
    }

    const resetFilters = () => {
        if(searchParams.toString() === '') return;

        router.push('/seminuevos');
        setKeywordsParamsAction('');
        setUIFiltersAction({key: 'orderOption', value: ''});
    }

    if(((fetchStatus === 'loading' && loadingPage) || (fetchStatus === 'loading' && !loadingPage) || (fetchStatus === 'completed' && loadingPage) || carsStatus === 'loading')) return <Spinner />;

    if(fetchStatus === 'error') return <Error title="Error inesperado" message="Vuelva a cargar la pagina o intentelo mas tarde." />;

    return (
        <>
            <FiltersHeader resetFilters={resetFilters} btnOrder={btnOrder} />

            <div className={`cars-filters-container relative grid-layout-${showFilters ? 'actived' : 'disabled'}`}>
                {(showFilters) && (
                    <div className="filters-container">
                        <button className="p-family btn-open pointer" onClick={() => setUIFiltersAction({ key: 'modalFilters', value: !modalFilters })}>
                            + Filtros
                        </button>

                        {modalFilters && (
                            <ModalFilters
                                createURL={createQueryString}
                                params={searchParams}
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

                    {carsStatus === 'not results' && <Error title="No encontramos autos relacionados a tu búsqueda." message="Ajusta los filtros y encuentra otras opciones." />}

                    {carsStatus === 'succes' && (
                        <div className={`cars-container ${showFilters ? 'grid-filters-actived' : 'grid-filters-disabled'}`}>
                            {cars.map((car) => (
                                <CarComponent car={car} key={car.id} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
