const User = require('../models/user');
const { Response } = require("../utils");


const addUser = async (req, res) => {
    try {
        const userBody = req.body;
        const user = {
            name: userBody.userName,
            email: userBody.email,
            access_level: userBody.accessLevel,
            pwd: userBody.password
        };
        if (await isNewUserName(user.name)) {
            await User.create(user);
            Response.created(res);
        } else {
            Response.badRequest(res, {
                msg: "User name already exists!"
            });
        }
    } catch(ex) {
        Response.internalServerErr(res, {
            msg: "Error occured while adding user!"
        });
    }
}

const getUsers = async (req, res) => {
    try {
        const users = (await User.findAll({ order: [['name']] }))
            .map(u => {
                return {
                    id: u.id,
                    name: u.name,
                    accessLevel: u.access_level,
                };
            });
        Response.ok(res, users);
    } catch(ex) {
        Response.internalServerErr(res, {
            msg: "Error occured while fetching users!"
        });
    }
}

const upgradeUserAccessLevel = async (req, res) => {
    try {
        const userId = req.body.id;
        const user = await User.findByPk(userId);
        if (user != null) {
            const admin = { access_level: "admin" };
            await user.update(admin);
            Response.created(res); 
        } else {
            Response.badRequest(res, {msg: "User not found!"});
        }
    } catch(ex) {
        Response.internalServerErr(res, {
            msg: "Error occured while updating user role!"
        });
    }
}

const isNewUserName = async (userName) => {
    return (await User.findOne({ where: { name: userName }})) == null;
}

module.exports = { addUser, getUsers, updateUsertoAdmin: upgradeUserAccessLevel }
