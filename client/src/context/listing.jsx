import { createContext, useState } from 'react';

const ListingContext = createContext()

function ListingProvider({children}){
    const [listings, setListings] = useState([])

    const context = [listings, setListings]

    return (
        <ListingContext.Provider value={context}>
            {children}
        </ListingContext.Provider>
    )
}

export { ListingContext, ListingProvider }