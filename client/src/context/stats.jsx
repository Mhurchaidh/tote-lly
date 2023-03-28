import { createContext, useState } from 'react';

const StatsContext = createContext()

function StatsProvider({children}){

    const initialStats = {
        gross_income: 0,
        cost_of_goods: 0,
        total_shipping: 0
    }

    const [stats, setStats] = useState(initialStats)

    const context = [stats, setStats]

    return (
        <StatsContext.Provider value={context}>
            {children}
        </StatsContext.Provider>
    )
}

export { StatsContext, StatsProvider }