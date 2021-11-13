import React from 'react'
import axios from 'axios';

function Transferring() {
    return (
        <div>
            <br /><br />
            Transfer From
                 <input type="number" placeholder="Write user id" />
            Transfer To
                 <input type="number" placeholder="Write user id" />
                 <input type="button" value="Transfer" />
                
        </div>
    )
}

export default Transferring
