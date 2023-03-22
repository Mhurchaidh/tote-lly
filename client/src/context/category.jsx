import { createContext, useState } from 'react';

const CategoryContext = createContext()

function CategoryProvider({children}){
    const [categories, setCategories] = useState([])

    const context = [categories, setCategories]

    return (
        <CategoryContext.Provider value={context}>
            {children}
        </CategoryContext.Provider>
    )
}

export { CategoryContext, CategoryProvider }