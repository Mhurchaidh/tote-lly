import { createContext, useState } from 'react';

const StoreContext = createContext()

function StoreProvider({children}){
    const [stores, setStores] = useState([])

    const context = [stores, setStores]

    return (
        <StoreContext.Provider value={context}>
            {children}
        </StoreContext.Provider>
    )
}

export { StoreContext, StoreProvider }