import { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { useDebounce } from 'use-debounce';

export default function Search({ query, handleSearch, placeholder = 'Search' }: any) {
    const [value, setValue] = useState<any>('');
    const [text] = useDebounce(value, 300);
    useEffect(() => {
        handleSearch(text)
    }, [text])

    return (
        <div className="my-2">
            <label htmlFor="search-field" className="sr-only">
                Search
            </label>
            <div className="relative w-full text-gray-400 focus-within:text-gray-600 border border-primary rounded-lg">
                <div className="pointer-events-none absolute ml-4 inset-y-0 left-0 flex items-center">
                    <BiSearch className="h-4 w-4" aria-hidden="true" />
                </div>
                <input
                    id="search-field1"
                    className="block w-full border-transparent py-2 pl-12 pr-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm rounded-lg"
                    placeholder={placeholder}
                    type="text"
                    // value={query}
                    autoComplete="off"
                    onChange={(e: any) => {
                        setValue(e.target.value)
                    }}
                    name="search_item"
                    defaultValue={query}
                />
            </div>
        </div>
    )
}
