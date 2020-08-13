const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const callRoutes = require('./api/routes/calls');

app.use('/calls', callRoutes);

module.exports = app;
