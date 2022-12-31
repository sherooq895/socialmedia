import { createContext } from 'react'

import { io } from 'socket.io-client'

export const socket = io('https://postx.gq',{path:"/socket/socket.io"});
export const Socketcontext = createContext()


function socketprovider({ children }) {
    return (
        <Socketcontext.Provider value={socket}>

        </Socketcontext.Provider>
    )

}
export default socketprovider
