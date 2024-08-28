"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { Car as CarComponent, ModalFilters, Spinner, Error } from "@/components";
import { TagParam, KeysParams } from "@/types";
import { keysParams } from "@/utils/globalVariables";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDown,
    faAngleUp,
    faFilter,
    faTimes
} from '@fortawesome/free-solid-svg-icons';

import { useCarsSelectors } from "@/hooks/useCarsSelectors";
import { useCarsActions } from "@/hooks/useCarsActions";

const orderOptions = ['Mayor precio', 'Menor precio', 'Más antiguos', 'Más recientes'];

export default function PreOwned() {
    const [order, setOrder] = useState(false);
    const [orderOption, setOrderOption] = useState<string>('');
    const [showFilters, setShowFilters] = useState(true);
    const [modalFilters, setModalFilters] = useState(false);
    const [tagsParams, setTags] = useState<TagParam[]>([])

    const pathname = usePathname();
    const params = useSearchParams();
    const router = useRouter();

    const { fetchStatus, cars, filterCars } = useCarsSelectors();
    const { filterAction } = useCarsActions();

    useEffect(() => {
        if (window.innerWidth >= 1024) {
            setModalFilters(true);
        } else {
            setShowFilters(true);
        }

        addEventListener('resize', () => {
            if (window.innerWidth >= 1024) {
                setModalFilters(true);
            } else {
                setModalFilters(false);
                setShowFilters(true);
            }
        })
    }, [])

    //only first load
    useEffect(() => {
        if (filterCars.length > 0) filterAction({params});
    }, [cars])

    useEffect(() => {
        getParams();

        const order = params.get('order');

        //don't run on first load
        if (fetchStatus === 'completed') filterAction({params});

        if (!order) {
            setOrderOption('');
        } else {
            setOrderOption(order);
        }
    }, [params])

    useEffect(() => {
        const body = document.getElementsByTagName('body');

        if (modalFilters && window.innerWidth <= 1023) {
            body[0].style.overflowY = 'hidden';
        } else {
            body[0].style.overflowY = 'auto';
        }
    }, [modalFilters])

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const newParams = new URLSearchParams(params);

            //empty spaces in a string are represented with a '+'
            newParams.set(name, value);

            if (name !== 'order') {
                newParams.delete('keywords');
            }

            return newParams.toString();
        },
        [params]
    )

    const btnOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
        const t = e.target as HTMLButtonElement;

        setOrderOption(t.value);
        setOrder(false);

        router.push(pathname + '?' + createQueryString('order', t.value));
    }

    const getParams = () => {
        let newTags: TagParam[] = [];

        const keywords = params.get('keywords');

        //avoid iterating the rest of the parameters if this is active
        if (keywords) {
            const extract = keywords.split('-');

            extract.forEach((e: string) => newTags.push({ key: 'keywords', value: e }));

            setTags(newTags);

            return;
        }

        keysParams.forEach((key: KeysParams) => {
            const values = params.get(key);

            if (values) {
                const extract = values.split('-');

                extract.forEach((e: string) => newTags.push({ key: key, value: e }));
            }
        })

        setTags(newTags);
    }

    const deleteParam = (tag: TagParam) => {
        const url = '/seminuevos';
        const currentP = new URLSearchParams(params);

        const p = params.get(tag.key);

        if (!p) return;

        if (p.includes('-')) {
            let extract = p.split('-').filter((e: string) => e !== tag.value);

            currentP.set(tag.key, extract.join('-'));
        } else {
            currentP.delete(tag.key);
        }

        router.push(url + '?' + currentP.toString());
    }

    return (
        <>
            <div className="preowned-header">
                <div className="results-order-container p-family items-between">
                    <button className="capitalize btn-toggle-filters pointer" onClick={() => setShowFilters(!showFilters)}      >
                        <FontAwesomeIcon icon={faFilter} className="icon" /> {showFilters ? 'ocultar filtros' : 'mostrar filtros'}
                    </button>

                    <Link href='/seminuevos' className="btn-clean color-4">Limpiar</Link>

                    <p className="results color-4">{filterCars.length} Resultados</p>

                    <div className="order-options-preowned relative">
                        <button className="btn-order" onClick={() => setOrder(!order)}>
                            Ordenar: <span className='selected pointer capitalize all-center color-1'>{orderOption} <FontAwesomeIcon icon={order ? faAngleUp : faAngleDown} className='icon-order color-1' /></span>
                        </button>

                        {order && (
                            <div className="options-container-preowned">
                                {orderOptions.map((option: string) => <button key={option} value={option} onClick={btnOrder} className="pointer">{option}</button>)}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {fetchStatus === 'loading' && <Spinner />}

            {fetchStatus === 'completed' && (
                <div className={`cars-filters-container relative grid-layout-${showFilters ? 'actived' : 'disabled'}`}>
                    {(showFilters) && (
                        <div className="filters-container">
                            <button className="p-family btn-open pointer" onClick={() => setModalFilters(true)}>
                                + Filtros
                            </button>

                            {modalFilters && (
                                <ModalFilters
                                    setModalFilters={setModalFilters}
                                    createURL={createQueryString}
                                    pathname={pathname}
                                    router={router}
                                    params={params}
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
                                    key={tag.value}
                                    className="p-family all-center"
                                    onClick={() => deleteParam(tag)}
                                >
                                    {tag.value} <FontAwesomeIcon icon={faTimes} className="icon color-1" onClick={() => deleteParam(tag)} />
                                </button>
                            ))}
                        </div>

                        {filterCars.length === 0 && (
                            <Error title="No encontramos autos relacionados a tu búsqueda." message="Ajusta los filtros y encuentra otras opciones." />
                        )}

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
