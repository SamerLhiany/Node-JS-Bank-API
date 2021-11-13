import React from "react";
import axios from 'axios';
 
 function GetAndAddUser() {
    const [users, setUsers] = React.useState([]);
    const [user, setUser] = React.useState({
        name: '',
        credit: '',
        money: ''
    })

    React.useEffect(() => {
        axios.get("http://localhost:5000/").then((res) => {
        console.log(res.data);
        }).catch(err=>{
            console.log("err",err);
        });
    }, [])

    const addUser = () => {
        if(user.name && user.credit && user.money) {
            console.log(2222);
            axios.post('http://localhost:5000/', user)
                .then((res) => {
                    
                    if (res.status === 201) {
                        console.log(res.data.user)
                        let list = [...users, res.data.user];
                        setUsers(list);
                    }
                }).catch((err) => {
                console.log("error")
            })
        }
        else{
            console.log("there is a problem");
        }
    }

    const textHandler = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
            [e.target.credit]: e.target.value,
            [e.target.money]: e.target.value
        })
        console.log("state :", e.target.value)
    }

     return (
         <div>
             <br /><br />
                 <input type="number" placeholder="Write User Id" />
                 <input type="button" value="Search" />
                 <br /><br />
                 <input type="text" placeholder="name" onChange={textHandler} />
                 <input type="number" placeholder="credit" onChange={textHandler} />
                 <input type="number" placeholder="money" onChange={textHandler} />
                 <input type="button" value="Add User"  onClick={addUser} />
         </div>
     )
 }
 
 export default GetAndAddUser;