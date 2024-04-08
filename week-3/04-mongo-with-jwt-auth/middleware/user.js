require("dotenv").config()
const jwt = require("jsonwebtoken")
const jwtPassword = process.env.jwtPassword;


function userMiddleware(req, res, next) {
    const signature = req.headers.authorization;
    const token = signature.slice(7, signature.length);

    try{
        jwt.verify(token, jwtPassword);
        next();
    }catch(err){
        return res.status(401).json({
            message: `The username or password could not be authorized ${err}`
        });
    }
}

module.exports = userMiddleware;