const { Admin } = require("../db/index")

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password;

    Admin.findOne({
        username: username,
        password: password,
    }).then((document)=>{
        if(document){
            return next();
        }
        return res.status(401).json({
            message: "Either the username or password is invalid"
        });

    }).catch(()=>{
        return res.status(500).json({
            message: "Internal Server Error"
        });
    })
}

module.exports = adminMiddleware;