import React from "react";
 
 function GetAndAddUser() {
     return (
         <div>
             <br /><br />
                 <input type="number" placeholder="Write User Id" />
                 <input type="button" value="Search" />
                 <br /><br />
                 <input type="text" placeholder="name" />
                 <input type="number" placeholder="credit" />
                 <input type="number" placeholder="money" />
                 <input type="button" value="Add User" />
         </div>
     )
 }
 
 export default GetAndAddUser;