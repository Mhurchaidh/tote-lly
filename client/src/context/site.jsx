import { createContext, useState } from 'react';

const SiteContext = createContext()

function SiteProvider({children}){
    const [sites, setSites] = useState([])

    const context = [sites, setSites]

    return (
        <SiteContext.Provider value={context}>
            {children}
        </SiteContext.Provider>
    )
}

export { SiteContext, SiteProvider }