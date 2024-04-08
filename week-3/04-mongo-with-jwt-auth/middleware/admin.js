const jwt = require("jsonwebtoken");
require('dotenv').config();

const jwtPassword = process.env.jwtPassword;

function adminMiddleware(req, res, next) {
    const signature = req.headers.authorization;
    const token = signature.slice(7,signature.length);

    try{
        jwt.verify(token, jwtPassword);
        next();
    }catch{
        res.status(401).json({
            message: "Authorization failed"
        });
    }
}

module.exports = adminMiddleware;