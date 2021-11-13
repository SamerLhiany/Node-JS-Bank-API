import React from "react";
import axios from 'axios';
import UserDisplay from "./UserDisplay";
 
 function GetAndAddUser() {
    const [users, setUsers] = React.useState([]);
    const [userDisplay, setUsersDisplay] = React.useState(false);
    const [user, setUser] = React.useState({
        name: '',
        credit: '',
        money: '',
        passportId:''
    })

    React.useEffect(() => {
        axios.get("http://localhost:5000/").then((res) => {
        }).catch(err=>{
            console.log("err",err);
        });
    }, [])

    const addUser = () => {
        if(user.name && user.credit && user.money) {
            axios.post('http://localhost:5000/', user)
                .then((res) => {
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
    }

    const addCash = async() => {
        try{
        if(user.passportId) {
            const userTemp=await axios.get('http://localhost:5000/'+user.passportId);
            axios.put('http://localhost:5000/'+user.passportId, {money:Number(user.money)+Number(userTemp.data.money)})
                .then((res) => {
                    setUsersDisplay(userDisplay?res.data:false);
                    if (res.status === 201) {
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
    catch(err){
        console.log("err");
        alert("user does not exist")
    }
    }

    const userSearch = async() => {
        try {
        if(user.passportId) {
            const userTemp=await axios.get('http://localhost:5000/'+user.passportId);
            setUsersDisplay(userTemp.data)   
        }}
        catch{alert("user does not exist")}
    }

    const WithdrawMoney = async () => {
        try{
            const userTemp=await axios.get('http://localhost:5000/'+user.passportId);
            if(userTemp.data.credit+userTemp.data.money>=user.money){
                const u=await axios.put('http://localhost:5000/'+user.passportId,{money:userTemp.data.money-user.money})
                setUsersDisplay(userDisplay?u.data:false);

            }
            else{
                throw("not enough");
            }
        }
        catch (err){
            alert(err||"error")
        }

    }

    const TransferMoney = () => {

    }

     return (
         <div>
             Search fot user
             <br /><br />
                 <input type="number" name={"passportId"} placeholder="Write User Id" onChange={textHandler} />
                 <input type="button" value="Search" onClick={userSearch} />
                 {userDisplay ? <UserDisplay user={userDisplay}/>:null }
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
                 <input type="number" name={"passportId"} placeholder="passport id" onChange={textHandler} />
                 <input type="number" name={"money"} placeholder="Deposit Cash" onChange={textHandler} />
                 <input type="button" value="Add Cash"  onClick={addCash} />
                 <br /><br />
                 Withdraw Money from user
                 <br /><br />
                 <input type="number" name={"passportId"} placeholder="passport id" onChange={textHandler} />
                 <input type="number" name={"money"} placeholder="Deposit Cash" onChange={textHandler} />
                 <input type="button" value="Withdraw money"  onClick={WithdrawMoney} />
                 <br /><br />
                 Transferring Money from user to user
                 <br /><br />
                 From
                 <input type="number" name={"passportId"} placeholder="passport id" onChange={textHandler} />
                 TO
                 <input type="number" name={"passportId"} placeholder="passport id" onChange={textHandler} />
                 How Much
                 <input type="number" name={"money"} placeholder="Write a number" onChange={textHandler} />
                 <input type="button" value="Transfer money"  onClick={TransferMoney} />   
                 <br /><br />
         </div>
     )
 }
 
 export default GetAndAddUser;