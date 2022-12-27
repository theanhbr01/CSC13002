'use strict';

const express = require('express')
const db = require("../models");
const UserHelper = require("../utils/UserHelper");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const router = express.Router();

// Get list of user
router.get('/', async (req, res) => {
    var users = await db.User.findAll({
        attributes: {exclude: ['Password']}
    });
    res.send(JSON.stringify(users, null, 2));
});

// Get detail user
router.get('/detail/:id', async (req, res) => {
    db.User.findByPk(req.params.id, {
        include: [
            db.UserProperty
        ],
        attributes: {exclude: ['Password']}
    })
    .then(user => {
        if(user)
            res.send(JSON.stringify(user, null, 2));
        else
            res.status(404).send({message: "User Not Found"});
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
});

// Get user by username
router.get('/uname/:username', async (req, res) => {
    var users = await db.User.findAll({
        include: [
            db.UserProperty
        ],
        where: {
            UserName: req.params.username
        }
    });
    res.send(JSON.stringify(users, null, 2));
});

// Search user by username
router.get('/search/:keyword', async (req, res) => {
    var users = await db.User.findAll({
        where: {
            [Op.or]:{
                UserName: {
                    [Op.like]: '%' + req.params.keyword + '%'
                }
            }
        }
    });
    res.send(JSON.stringify(users, null, 2));
});

//Create
router.post('/create', UserHelper.GetUser, UserHelper.CreateUser);

//Update
router.put('/edit/:id', UserHelper.GetUserById, UserHelper.ValidateUser, async (req, res) => {
    const user = req.user;
    db.User.update({
        Password: bcrypt.hashSync(req.body.password, 8),
        LastActivyDate: Date.now()
    }, {
        where: {
            id: user.id
        }
    })
    .then(user => {
        res.send({ message: "User Updated"});
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
});

//Add property
router.post('/:id/property/new', UserHelper.GetUserById, UserHelper.ValidateUser, async(req, res) => {
    const user = req.user;
    const title = req.body.title;
    const value = req.body.value;
    db.UserProperty.create({
        UserId: user.id,
        Title: title,
        Value: value
    })
    .then(userProperty => {
        res.send({ message: "Successfully added new property"});
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
});

// Delete property
router.delete('/:id/property/delete', UserHelper.GetUserById, UserHelper.ValidateUser, async(req, res) => {
    const user = req.user;
    const title = req.body.title;
    db.UserProperty.destroy({
        where: {
            [Op.and]: [
                { Title: title },
                { UserId: req.params.id }
            ]
        }
    })
    .then(userProperty => {
        res.send({ message: "Successfully deleted a property"});
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
});

//Update property
router.put('/:id/property/edit', UserHelper.GetUserById, UserHelper.ValidateUser, async(req, res) => {
    const user = req.user;
    const title = req.body.title;
    const newValue = req.body.newValue;
    db.UserProperty.update({
            Title: title,
            Value: newValue
        }, {
        where: {
            [Op.and]: [
                { Title: title },
                { UserId: req.params.id }
            ]
        }
    })
    .then(userProperty => {
        res.send({ message: "Successfully updated a property"});
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
});

//Delete
router.delete('/delete/:id', UserHelper.GetUserById, UserHelper.ValidateUser, async (req, res) => {
    const user = req.user;
    db.User.destroy({
        where: {
            id: user.id
        }
    })
    .then(user => {
        res.send({ message: "User Deleted"});
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
});
module.exports = router;