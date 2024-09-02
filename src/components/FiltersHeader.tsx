'use client';

import type { FiltersHeaderProps } from '@/types';

import { useCarsSelectors } from '@/hooks/useCarsSelectors';
import { useCarsActions } from '@/hooks/useCarsActions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faFilter } from '@fortawesome/free-solid-svg-icons';

const orderOptions = ['Mayor precio', 'Menor precio', 'Más antiguos', 'Más recientes'];

export default function FiltersHeader({resetFilters, btnOrder}: FiltersHeaderProps) {
    const {filterCars, UIFilters: {showFilters, openOrderOptions, orderOption}} = useCarsSelectors();
    const {setUIFiltersAction} = useCarsActions();

    return (
        <div className="preowned-header">
            <div className="results-order-container p-family items-between">
                <button className="capitalize btn-toggle-filters pointer" onClick={() => setUIFiltersAction({key: 'showFilters', value: !showFilters})}      >
                    <FontAwesomeIcon icon={faFilter} className="icon" /> {showFilters ? 'ocultar filtros' : 'mostrar filtros'}
                </button>

                <button className="btn-clean color-4" onClick={resetFilters}>Limpiar</button>

                <p className="results color-4">{filterCars.length} Resultados</p>

                <div className="order-options-preowned relative">
                    <button className="btn-order" onClick={() => setUIFiltersAction({key: 'openOrderOptions', value: !openOrderOptions})}>
                        Ordenar: <span className='selected pointer capitalize all-center color-1'>{orderOption} <FontAwesomeIcon icon={openOrderOptions ? faAngleUp : faAngleDown} className='icon-order color-1' /></span>
                    </button>

                    {openOrderOptions && (
                        <div className="options-container-preowned">
                            {orderOptions.map((option: string) => <button key={option} value={option} onClick={btnOrder} className="pointer">{option}</button>)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
