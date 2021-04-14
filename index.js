const express = require('express');
const app = express();
const cors = require('cors');
const logger = require ('./logger.js');
const checkPhones = require('./checkPhones');
app.use(cors());
app.use(express.json());
app.use(logger);
app.listen(3223);

console.log('server start')

app.get('/checkPhones/:phone', checkPhones.checkPhones)
