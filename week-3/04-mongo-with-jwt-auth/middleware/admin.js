// Middleware for handling auth
const jwt = require('jsonwebtoken');
const { Admin } = require('../db/index');

async function adminMiddleware(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    const verifyToken = jwt.verify(token, 'secret').data;
    const admins = await Admin.find({verifyToken});
    if(admins){
        next();
    } else {
        res.status(403).json({message: 'unauthorized'});
    }
}

module.exports = adminMiddleware;