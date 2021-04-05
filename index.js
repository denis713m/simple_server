const express = require('express');
const app = express();
const cors = require('cors');
const logger = require ('./logger.js');
app.use(cors());
app.use(express.json());
app.use(logger);
app.listen(3223);

app.get('/test', (req, res)=>{res.send({text:'TEst', author:'Demon'})})
app.use('/', (req, res)=>{res.send({text:'Hello', author:'Den'})})