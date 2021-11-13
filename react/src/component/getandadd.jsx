import React from "react";
import axios from 'axios';
 
 function GetAndAddUser() {
    const [users, setUsers] = React.useState([]);
    const [user, setUser] = React.useState({
        name: '',
        credit: '',
        money: '',
        passportId:''
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
            axios.post('http://localhost:5000/', user)
                .then((res) => {
                    console.log(res);
                    if (res.status === 201) {
                        console.log(res.data.user)
                        let list = [...users, res.data.user];
                        setUsers(list);
                    }
                }).catch((err) => {
                console.log("error")
                alert("user exists ")
            })
        }
        else{
            console.log("there is a problem");
            alert('Please Fill All The Fields')
        }
    }

    const textHandler = (e) => {
        let usertemp = {...user};
        usertemp[e.target.name]=e.target.value;
        setUser(
            usertemp
          )
        console.log(usertemp)
    }

     return (
         <div>
             Search fot user
             <br /><br />
                 <input type="number" placeholder="Write User Id" />
                 <input type="button" value="Search" />
                 <br /><br />
                 Add user
                 <br /><br />
                 <input type="text" name={"name"} placeholder="name" onChange={textHandler} />
                 <input type="number" name={"credit"} placeholder="credit" onChange={textHandler} />
                 <input type="number" name={"money"} placeholder="money" onChange={textHandler} />
                 <input type="number" name={"passportId"} placeholder="passport id" onChange={textHandler} />
                 <input type="button" value="Add User"  onClick={addUser} />
                 <br /><br />
                 Deposit Money for user
                 <br /><br />

                 <br /><br />
                 Withdraw Money from user
                 <br /><br />

                 <br /><br />
                 Transferring Money from user to user
                 <br /><br />
                 
                 <br /><br />
         </div>
     )
 }
 
 export default GetAndAddUser;