const uniqid = require('uniqid');
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express()
const fs = require('fs')
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    if (!fs.existsSync('./bank.json')) {
        fs.writeFileSync('./bank.json', '[]')
    }
    const buffer = JSON.parse(fs.readFileSync('./bank.json').toString())
    res.status(200).json(buffer)
})

app.put('/:email', (req, res) => {
    let buffer = JSON.parse(fs.readFileSync('./bank.json').toString())
    const users = buffer.find(itm => itm.email === req.params.email);
    if (users) {
        users.money = parseFloat(req.body.money);
        fs.writeFileSync('./bank.json', JSON.stringify(buffer))
        res.status(200).send(users)
    }
    else {
        const item = {
            name: req.body.name,
            email: req.body.email,
            credit: parseFloat(req.body.credit),
            money: parseFloat(req.body.money),
            id: uniqid()
        }
        buffer = [...buffer, item]
        fs.writeFileSync('./bank.json', JSON.stringify(buffer))
        res.status(201).json(item)
    }

})



app.post('/', (req, res) => {
    let buffer = JSON.parse(fs.readFileSync('./bank.json').toString())
    if (buffer.find(itm => { return req.body.email === itm.email })) {
        return res.status(404).send('user exists')
    }
    const item = {
        name: req.body.name,
        email: req.body.email,
        credit: parseFloat(req.body.credit),
        money:  parseFloat(req.body.money),
        id: uniqid()
    }
    buffer = [...buffer, item]
    fs.writeFileSync('./bank.json', JSON.stringify(buffer))
    return res.status(201).json(item)
})

app.listen(6000, () => {
    console.log("listening on port 6000");
})
