const { Admin } = require("../db/index");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    const { username, password } = req.headers;
    try {
        const response = await Admin.find({username, password});
        if(response){
            next();
        } else {
            res.status(404).json({message: 'admin not found'});
        }
    } catch (error) {
        res.status(404).json({message: 'error while finding admins'});
    }
}

module.exports = adminMiddleware;