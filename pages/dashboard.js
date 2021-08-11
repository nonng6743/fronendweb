import React, {useContext, useEffect} from 'react'
import Router from "next/router"
import { AuthContext } from '../appState/AuthProvider'

const dashboard = () =>  {
    const { user } = useContext(AuthContext)

    
    useEffect(() => {
        if (user.role === 'user') {
            Router.push("/user")
        }
        if (user.role === 'seller') {
            Router.push("/seller/sellermanages")
        }
        
    },[])
    

    return (
        <div>
            
        </div>
    )
}

export default dashboard
