'use strict';
const express = require('express');
const jwt = require("jsonwebtoken");
const db = require("../models");
const bcrypt = require("bcryptjs");
const AuthencationHelper = require('../utils/AuthencationHelper');
const UserHelper = require('../utils/UserHelper');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const router = express.Router()

router.post('/login', async (req, res) => {
    await db.User.findOne({
        where: {
            userName: req.body.userName
        }
    })
    .then(user => {
        if(!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        const validatePassword = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if(!validatePassword) {
            return res.status(401).send({
                accessToken: null,
                message: "Wrong Password!"
            });
        }

        var token = jwt.sign({ id: user.id }, config.authencation.secretKey, {
            expiresIn: config.authencation.expiration
        });

        res.status(200).send({
            id: user.id,
            username: user.userName,
            email: user.email,
            accessToken: token
          });
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
});

router.post('/signup', UserHelper.CreateUser)

router.get('/isAuthenticated', AuthencationHelper.VerifyToken, (req, res) => {
    res.status(200).send({"IsAuthenticated": true});
})

router.get('/logout', AuthencationHelper.VerifyToken, (req, res) => {

    jwt.sign({ id: user.id }, config.authencation.secretKey, {
        expiresIn: 0 // 24 hours
    });

    res.status(200).send({"successed": true});
})

module.exports = router;