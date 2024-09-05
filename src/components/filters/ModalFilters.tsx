'use client';

import { useState } from 'react';
import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp,faTimes } from '@fortawesome/free-solid-svg-icons';

import type { AccordionOptions, ModalProps, MainKeyQueryParams } from '@/types';
import { mainKeyQueryParams } from '@/utils/globalVariables';
import { useCarsSelectors } from '@/hooks/useCarsSelectors';
import { useCarsActions } from '@/hooks/useCarsActions';

export default function ModalFilters({ createURL, params, tagsParams }: ModalProps) {
    const [brandAccor, setBrand] = useState(false);
    const [yearAccor, setYear] = useState(false);
    const [colorAccor, setColor] = useState(false);
    const [doorsAccor, setDoor] = useState(false);
    const [transmissionsAccor, setTransmission] = useState(false);

    const {filterOptions} = useCarsSelectors();
    const {setUIFiltersAction} = useCarsActions();

    const getClass = (key: MainKeyQueryParams, value: string): string => {
        const p = params.get(key);

        if (!p || !p.includes(value)) return 'btn-light';

        return 'btn-dark';
    }

    const btnCreateQuery = (e: React.MouseEvent<HTMLButtonElement>, key: MainKeyQueryParams) => {
        const t = e.target as HTMLButtonElement;
        const text = t.innerText.toLowerCase();

        const p = params.get(key);

        let tag = [...tagsParams];

        if (!p) {
            tag.push({key, value: text});

            createURL(key, text);

            return;
        }

        if (!p.includes(text)) {           
            tag.push({key, value: text});

            createURL(key, p + '-' + text);
        }
    }

    return (
        <div className="modal-container">
            <div className="filters-mobile">
                <div className="actions items-between">
                    <button className="btn-close items-center pointer"><FontAwesomeIcon icon={faTimes} onClick={() => setUIFiltersAction({key: 'modalFilters', value: false})} /></button>

                    <p className="t-family">Filtros</p>

                    <Link href='/seminuevos' className="color-4 p-family">Limpiar</Link>                    
                </div>

                <div className="filters p-family">
                    {mainKeyQueryParams.map(key => {
                        const obj: AccordionOptions = {
                            brand: {
                                bool: brandAccor,
                                set: setBrand,
                                keyUI: 'Marca',
                                options: filterOptions.brands
                            },
                            year: {
                                bool: yearAccor,
                                set: setYear,
                                keyUI: 'Año',
                                options: filterOptions.years
                            },
                            doors: {
                                bool: doorsAccor,
                                set: setDoor,
                                keyUI: 'Puertas',
                                options: filterOptions.doors
                            },
                            transmission: {
                                bool: transmissionsAccor,
                                set: setTransmission,
                                keyUI: 'Transmision',
                                options: filterOptions.transmissions
                            },
                            color: {
                                bool: colorAccor,
                                set: setColor,
                                keyUI: 'Color',
                                options: filterOptions.colors
                            }
                        }

                        return (
                            <div className="accordion-container border-bottom" key={key}>
                                <button
                                    className={`btn-action pointer ${obj[key].bool ? 'color-1' : 'color-4'}`}
                                    onClick={() => obj[key].set(!obj[key].bool)}
                                >
                                    {obj[key].keyUI} <FontAwesomeIcon icon={obj[key].bool? faAngleUp : faAngleDown} className="icon-filter" />
                                </button>

                                {obj[key].bool && (
                                    <div className="options">
                                        {obj[key].options.map(option => (
                                            <button
                                                className={`capitalize ${getClass(key, option.toString().toLowerCase())}`}
                                                key={option}
                                                onClick={(e: React.MouseEvent<HTMLButtonElement>) => btnCreateQuery(e, key)}
                                            >
                                                {option.toString()}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>

                <button
                    className="btn-show p-family capitalize"
                    onClick={() => setUIFiltersAction({key: 'modalFilters', value: false})}
                >
                    Mostrar resultados
                </button>
            </div>
        </div>
    )
}
