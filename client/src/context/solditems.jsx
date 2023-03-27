import { createContext, useState } from 'react';

const SoldItemContext = createContext()

function SoldItemProvider({children}){
    const [soldItems, setSoldItems] = useState([])

    const context = [soldItems, setSoldItems]

    return (
        <SoldItemContext.Provider value={context}>
            {children}
        </SoldItemContext.Provider>
    )
}

export { SoldItemContext, SoldItemProvider }