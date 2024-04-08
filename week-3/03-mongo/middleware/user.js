const { User } =require("../db/index")
async function userMiddleware(req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password;

    const response = await User.findOne({username: username, password: password});

    if(!response){
        return res.status(401).json({
            message: "Either the username or password is invalid"
        });
    }

    next();
}

module.exports = userMiddleware;