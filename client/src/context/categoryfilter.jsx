import { createContext, useState } from 'react';

const CategoryFilterContext = createContext()

function CategoryFilterProvider({children}){
    const [filterCategory, setFilteredCategory] = useState('all')

    const context = [filterCategory, setFilteredCategory]

    return (
        <CategoryFilterContext.Provider value={context}>
            {children}
        </CategoryFilterContext.Provider>
    )
}

export { CategoryFilterContext, CategoryFilterProvider }