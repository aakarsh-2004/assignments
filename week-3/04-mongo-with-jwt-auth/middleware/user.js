const jwt = require('jsonwebtoken');
const { User } = require('../db/index');

async function userMiddleware(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    try {
        const verifyToken = jwt.verify(token, 'secret').data;
        const users = await User.findOne({username: verifyToken});
        if(users){
            next();
        } else {
            res.status(403).json({message: 'unauthorized'});
        }
    } catch (error) {
        res.json({message: 'error while verifying token or finding users'});
    }
}

module.exports = userMiddleware;