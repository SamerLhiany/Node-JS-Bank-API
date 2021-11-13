import React from "react";
import './style.css';
import axios from 'axios';
 
const GetAndAddUser = () => {
	const [ state, setstate ] = React.useState([]);
	const [ names, setNames ] = React.useState('');
	React.useEffect(() => {
		axios.get('http://localhost:6000/').then((res) => {
			setstate(res.data);
		});
	}, []);

	
	const nameHandler = (e) => {
		setNames(e.target.value);
	};
	const addNamesHandler = async () => {
		if (names.trim().length !== 0) {
			let data = {
				name: names
			};
			const res = await axios.post('http://localhost:6000/', data);
			let newData = res.data;
			const stateList = [ ...state ];
			stateList.push(newData);
			setstate(stateList);
			setNames('');
		}
	};

	return (
		<div className="container">
			<div>
				<h1>Customers Transfer</h1>
				<input type="text" className="text" onChange={nameHandler} placeholder="Enter a Name" />{' '}
				<input type="number" className="number" onChange={nameHandler} placeholder="Enter a Credit" />{' '}
				<input type="number" className="number" onChange={nameHandler} placeholder="Enter a Money" />{' '}
				<input className="btn" type="button" onClick={addNamesHandler} value="Add Customers" />
			</div>
			<table className="pure-table">
				<thead>
					<tr>
						<th>id</th>
						<th>Name</th>
						<th>credit</th>
						<th>money</th>
					</tr>
				</thead>
				<tbody>
					{state.map((element) => {
						return (
							<tr className="userList" key={element.id}>
								<td>{element.id}</td>
								<td>
									
								</td>
								<td>{element.name}</td>
								<td>{element.credit}</td>
								<td>{element.money}</td>
								<td>
									{' '}
								
								</td>
                                
							</tr>
						);
					})}{' '}
					</tbody>
				</table>
		</div>
	);
                }
export default GetAndAddUser;

    

    //  return (
    //      <div>
    //          <br /><br />
    //              <input type="number" placeholder="Write User Id" />
    //              <input type="button" value="Search" />
    //              <br /><br />
    //              <input type="text" placeholder="name" />
    //              <input type="number" placeholder="credit" />
    //              <input type="number" placeholder="money" />
    //              <input type="button" value="Add User" />
    //      </div>
    //  )

 
//  export default GetAndAddUser;