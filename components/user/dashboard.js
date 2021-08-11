import React, { useContext } from 'react'
import { AuthContext } from '../../appState/AuthProvider';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    console.log(user)


    return (
        <div>
            <h1>{user.firstname}</h1>
            <h1>{user.lastname}</h1>
            <h1>{user.email}</h1>
        </div>
    )
}

export default Dashboard
