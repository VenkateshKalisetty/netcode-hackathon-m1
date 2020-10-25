const jwt = require('jsonwebtoken');
const User = require('../models/user');
const CONSTANT = require('../config');
const { Response } = require("../utils");

const isUserExist = async (userName, password) => {
    const user = await User.findOne({ where : { name: userName, pwd: password }});
    return user ? {
        id: user.id,
        name: user.name,
        accessLevel: user.access_level
    } : null;
}

const authAdmin = (req, res, next) => {
    const isAdmin = req.user.accessLevel == CONSTANT.ACCESS_LEVELS.ADMIN;
    if (isAdmin)
        next();
    else
        Response.accessForbidden(res, { msg: "Your access for this resource is forbidden!" });
}

const generateToken = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await isUserExist(userName, password);
        if (user) {
            const jwtToken = jwt.sign(user, CONSTANT.JWT_SECRET_TOKEN, {
                expiresIn: CONSTANT.JWT_TOKEN_EXPIRE_TIME
            });
            Response.ok(res, { jwtToken, user });
        } else {
            Response.badRequest(res, {
                msg: "Invalid Login details!"
            });
        }  
    } catch(ex) {
        Response.internalServerErr(res, { msg: "Error occured while checking the user login!"});
    }
}

const authenticateRequest = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, CONSTANT.JWT_SECRET_TOKEN, (err, user) => {
            if (err)
                Response.unAuthorized(res);
            else {
                req.user = user;
                next();
            }
        });
    } else {
        Response.unAuthorized(res);
    }
}

module.exports = {
    authAdmin,
    generateToken,
    authenticateRequest
};