const express = require('express');
const app = express();

//middleware
app.use(express.static('./public'));
app.use(express.json());


// ... add routes


module.exports = app;