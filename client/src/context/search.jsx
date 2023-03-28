import { createContext, useState } from 'react';

const SearchContext = createContext()

function SearchProvider({children}){
    const [searchValue, setSearchValue] = useState('')

    const context = [searchValue, setSearchValue]

    return (
        <SearchContext.Provider value={context}>
            {children}
        </SearchContext.Provider>
    )
}

export { SearchContext, SearchProvider }