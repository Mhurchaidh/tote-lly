import { createContext, useState } from 'react';

const OptionContext = createContext()

function OptionProvider({children}){
    const [showOptions, setShowOptions] = useState(false)

    const context = [showOptions, setShowOptions]

    return (
        <OptionContext.Provider value={context}>
            {children}
        </OptionContext.Provider>
    )
}

export { OptionContext, OptionProvider }