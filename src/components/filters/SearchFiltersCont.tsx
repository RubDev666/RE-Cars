'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";

import { SearchFiltersProps } from "@/types";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleDown, faAngleUp, faAngleRight, faArrowLeft} from '@fortawesome/free-solid-svg-icons';

import { useCarsSelectors } from "@/hooks/useCarsSelectors";

import { optionsType, optionsKey } from "@/utils/globalVariables";

import { Skeleton, Searcher } from '@/components';

export default function SearchFiltersCont({ openMenu, currentOption, setCurrentOption }: SearchFiltersProps) {
    const pathname = usePathname();

    const { fetchStatus, filterOptions } = useCarsSelectors();

    return (
        <div className={`search-filters-container ${pathname !== '/' ? 'none' : 'items-between'}`} >
            <div className={`search-container ${openMenu ? 'none' : 'block'}`}>
                <Searcher />
            </div>

            <div className={`filter-header-container ${openMenu ? 'block' : 'none'} p-family`}>
                {fetchStatus === 'loading' && (
                    <>
                        <Skeleton type="header" />
                        <Skeleton type="header" />
                        <Skeleton type="header" />
                        <Skeleton type="header" />
                        <Skeleton type="header" />
                    </>
                )}

                {fetchStatus === 'completed' && (
                    <>
                        <p className="color-4">Filtrar por:</p>
                        
                        {optionsType.map((option: string) => (
                            <button
                                className={`btn-filter ${'test-' + option} capitalize pointer ${currentOption === option ? 'color-1' : 'color-4'}`}
                                onClick={() => currentOption === option ? setCurrentOption('') : setCurrentOption(option)}
                                key={option}
                            >
                                {option}
                                <FontAwesomeIcon icon={faAngleRight} className='icon-filter color-1 icon-mobile' /> <FontAwesomeIcon icon={currentOption === option ? faAngleUp : faAngleDown} className='color-1 icon-pc icon-filter' />
                            </button>
                        ))}
                    </>
                )}
            </div>

            <div className={`options-container ${currentOption !== '' ? 'block' : 'none'} ${currentOption}`}>
                <FontAwesomeIcon
                    icon={faArrowLeft}
                    onClick={() => setCurrentOption('')}
                    className='color-1 pointer icon'
                />

                {currentOption === optionsKey.keyBrand ? (
                    <p className='t-family title-brand'>Marcas mas populares</p>
                ) : (
                    <p className='t-family capitalize title-brand'>{currentOption}</p>
                )}

                <div className="options p-family">
                    {currentOption === optionsKey.keyBrand && (
                        filterOptions.brands.map((brand) => (
                            <Link href={`/seminuevos?brand=${brand.toLowerCase().replace(' ', '+')}`} key={brand}>{brand}</Link>
                        ))
                    )}

                    {currentOption === optionsKey.keyYear && (
                        filterOptions.years.map((year) => (
                            <Link href={`/seminuevos?year=${year.toString()}`} key={year}>{year}</Link>
                        ))
                    )}

                    {currentOption === optionsKey.keyDoors && (
                        filterOptions.doors.map((door) => (
                            <Link href={`/seminuevos?doors=${door.toString()}`} key={door}>{door}</Link>
                        ))
                    )}

                    {currentOption === optionsKey.keyTransmission && (
                        filterOptions.transmissions.map((transmission) => (
                            <Link href={`/seminuevos?transmission=${transmission.toLowerCase()}`} className="capitalize" key={transmission}>{transmission}</Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
