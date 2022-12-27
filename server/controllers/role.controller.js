'use strict';
const express = require('express');
const db = require("../models");
const RoleHelper = require("../utils/RoleHelper");
const UserHelper = require("../utils/UserHelper");

const router = express.Router();

// Get list
router.get('/', async (req, res) => {
    var roles = await db.Role.findAll();
    res.send(JSON.stringify(roles, null, 2));
});

// Get list <title, id>
router.get('/getList', async (req, res) => {
    var roles = await db.Role.findAll();
    var newList = {};
    roles.forEach(role => {
        newList[role.Title] = role.id;
    });
    res.send(JSON.stringify(newList, null, 2));
});

// Get detail
router.get('/detail/:id', async (req, res) => {
    var role = await db.Role.findByPk(req.params.id);
    if(role)
        res.send(JSON.stringify(role, null, 2));
    else
        res.status(404).send({message: "Role Not Found"});
});

// Get list by user
router.get('/user/:id', async (req, res) => {
    var roles = await db.Role.findAll({
            include: [{
                model: db.User,
                where: {
                    id:  req.params.id
                }
            }]
        });

    if(roles)
        res.send(JSON.stringify(roles, null, 2));
    else
        res.status(404).send({message: "Roles Not Found"});
});

// Create 
router.post('/create', RoleHelper.GetRole, RoleHelper.CreateRole);

// Update 
router.put('/edit/:id', RoleHelper.GetRoleById, RoleHelper.ValidateRole, async (req, res) => {
    const role = req.role;
    db.Role.update({
        Title: role.Title
    }, {
        where: {
            id: role.id
        }
    })
    .then(role => {
        res.send({ message: "Role Updated"});
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
});

// Delete
router.delete('/delete/:id', RoleHelper.GetRoleById, RoleHelper.ValidateRole, async (req, res) => {
    const role = req.role;
    db.Role.destroy({
        where: {
            id: role.id
        }
    })
    .then(role => {
        res.send({ message: "Role Deleted"});
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
});

// Assign Role To User
router.post('/assign', UserHelper.GetUserById, UserHelper.ValidateUser, RoleHelper.GetRoleById, RoleHelper.ValidateRole, RoleHelper.AssignRoleToUser);
router.post('/unassign', UserHelper.GetUserById, UserHelper.ValidateUser, RoleHelper.GetRoleById, RoleHelper.ValidateRole, RoleHelper.UnassignRoleForUser);

module.exports = router;