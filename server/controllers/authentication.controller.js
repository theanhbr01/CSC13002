'use strict';

const express = require('express')
const db = require("../models");

const router = express.Router()

router.get('/', (req, res, next) => {
    res.send("Hello World");
});

module.exports = router