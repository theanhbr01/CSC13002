'use strict';

var express = require('express');

const app = express();

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('App listening on port 5000')
 })