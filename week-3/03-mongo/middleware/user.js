const { User } = require("../db/index");

async function userMiddleware(req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password;

    try {
        const response = await User.find({username, password});
        if(response){
            next();
        } else {
            res.status(404).json({message: 'user not found'});
        }
    } catch (error) {
        res.status(404).json({message: 'error while finding users'});
    }
}

module.exports = userMiddleware;