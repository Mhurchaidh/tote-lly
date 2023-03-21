import { createContext, useState } from 'react';

const UserContext = createContext()

function UserProvider({children}){
    const [user, setUser] = useState(null)

    const context = [user, setUser]

    return (
        <UserContext.Provider value={context}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }