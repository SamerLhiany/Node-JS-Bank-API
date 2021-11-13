const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	if (!fs.existsSync('./bank.json')) {
		fs.writeFileSync('./bank.json', '[]');
	}
	const buffer = JSON.parse(fs.readFileSync('./bank.json').toString());
	res.status(200).json(buffer);
});

app.put('/:id', (req, res) => {
	let buffer = JSON.parse(fs.readFileSync('./bank.json').toString());
    const user=buffer.find((itm) =>  req.params.id == itm.id);
    
	if (!user) {
		return res.status(404).send('user not exists');
	} else {
        user.money=req.body.money||user.money;
        user.credit=req.body.credit||user.credit;
		fs.writeFileSync('./bank.json', JSON.stringify(buffer));
		res.status(201).json(user);
	}
});

app.post('/', (req, res) => {
	
	let buffer = JSON.parse(fs.readFileSync('./bank.json').toString());
	if (
		buffer.find((itm) => {
			return parseInt(req.body.id) === itm.id;
		})
	) {
		return res.status(404).send('user exists');
	}
	if (!req.body.id) {
		return res.status(404).send('invaid id');
	}
	const item = {
		name: req.body.name,
		credit: parseFloat(req.body.credit),
		money: parseFloat(req.body.money),
		id: parseInt(req.body.id)
	};
	buffer = [ ...buffer, item ];
	fs.writeFileSync('./bank.json', JSON.stringify(buffer));
	return res.status(201).json(item);
});

app.listen(5000, () => {
	console.log('listening on port 5000');
});
