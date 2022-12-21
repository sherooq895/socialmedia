import { createContext } from 'react'

import { io } from 'socket.io-client'

export const socket = io("http://localhost:8900")
export const Socketcontext = createContext()


function socketprovider({ children }) {
    return (
        <Socketcontext.Provider value={socket}>

        </Socketcontext.Provider>
    )

}
export default socketprovider
