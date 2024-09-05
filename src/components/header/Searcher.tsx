'use client';

import { ChangeEvent, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useCarsActions } from "@/hooks/useCarsActions";

export default function Searcher() {
    const [formOnSelect, setFormOnSelect] = useState(false);
    const [searchText, setBusqueda] = useState('');

    const router = useRouter();
    const pathname = usePathname();

    const { setKeywordsParamsAction } = useCarsActions();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        if (searchText === '') return;

        //obtain an array with keywords to iterate in the search
        const arr = searchText.toLocaleLowerCase().trim().split(' '); //includes some empty strings

        //here we remove empty strings and we extract the keywords
        const arr2 = arr.filter((text) => text !== '');

        if(pathname === '/seminuevos') setKeywordsParamsAction(arr2.join('-'));
        if(pathname !== '/seminuevos') router.push('/seminuevos?keywords=' + arr2.join('-'));
    }

    return (
        <form
            onSubmit={handleSearch}
            onSelect={() => setFormOnSelect(true)}
            onBlur={() => setFormOnSelect(false)}
            className={`all-center ${formOnSelect ? 'border-active' : 'border-disabled'}`}
        >
            <label
                htmlFor='filter'
                onClick={() => setFormOnSelect(true)}
            >
                <button type='submit' id="btn-subtmit" aria-label="btn-submit">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className={`search-icon ${formOnSelect ? 'icon-active' : 'icon-disabled'}`} />
                </button>
            </label>
            
            <input id='filter' type="text" placeholder='Buscar por marca, modelo, año, etc.' className='p-family' onChange={(e: ChangeEvent<HTMLInputElement>) => setBusqueda(e.target.value.trim())} />
        </form>
    )
}
