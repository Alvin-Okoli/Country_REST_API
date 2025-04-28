const express = require('express');
const app = express();
const data = require('./data.json')
const cors = require('cors')

//env file
require('dotenv').config();
const port = process.env.PORT;

//middleware
app.use(express.json());      
app.use(express.static('public')); 
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['Get']
}))

app.listen(port, () => {
    console.log(`Server started`);
});

app.get('/', (req, res) => {
    console.log('received index request')
    res.status(200).json({ message: 'Hello World' });
});

app.get('/load', (req, res) => {
    console.log('received request')
    res.json(data);
});

app.get('/country/:country', (req, res)=>{
    const country = req.params.country
    const datas = data.filter(datas => datas.name === country)
    res.json(datas)
})