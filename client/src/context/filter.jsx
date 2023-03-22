import { createContext, useState } from 'react';

const FilterContext = createContext()

function FilterProvider({children}){
    const [filter, setFilter] = useState(null)

    const context = [filter, setFilter]

    return (
        <FilterContext.Provider value={context}>
            {children}
        </FilterContext.Provider>
    )
}

export { FilterContext, FilterProvider }