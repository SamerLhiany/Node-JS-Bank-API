import React from 'react'

function UserDisplay({user}) {

    return (
        <div>
            <p>Name : {user.name}</p>
            <p>Credit : {user.credit}</p>
            <p>Money : {user.money}</p>
        </div>
    )
}

export default UserDisplay
