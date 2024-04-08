require("dotenv").config()
const { Router, json} = require("express");
const userMiddleware = require("../middleware/user");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const { User, Course } = require("../db/index")

const router = Router();
const jwtPassword = process.env.jwtPassword;

const inputAuthSignSchema = zod.object({
    username: zod.string(),
    password: zod.string()
})

const inputAuthCourseHeaderSchema = zod.string().startsWith("Bearer");

function inputAuthVerifySignSchema(req, res, next){
    const jsonHeaderData = req.body;

    if(!inputAuthSignSchema.safeParse(jsonHeaderData).success){
        return res.status(404).json({
            message: "The username or password should be a string"
        })
    }

    next();
}

function inputAuthVerifyCourseHeaderSchema(req, res, next){
    const signature = req.headers.authorization;
    if(!inputAuthCourseHeaderSchema.safeParse(signature).success){
        return res.status(403).json({
            message: "Authorization Forbidden. Input Validation Failed"
        });
    }

    next();
}

router.post('/signup', inputAuthVerifySignSchema, async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const response = await User.findOne({username: username});

    if(response){
        return res.status(403).json({
            message: "The username already exists"
        });
    }

    const userData = new User({
        username: username,
        password: password
    });

    const result = await userData.save();

    if(!result){
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }

    return res.status(201).json({
        message: "User created successfully"
    });

});

router.post('/signin', inputAuthVerifySignSchema, async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const response = await User.findOne({username: username, password:password});

    if(!response){
        res.status(401).json({
            message: "The username or password is incorrect"
        })
    }

    const signature = "Bearer " + jwt.sign({username: username}, jwtPassword);

    return res.status(200).json({
        token: signature
    });
});

router.use(inputAuthVerifyCourseHeaderSchema);
router.get('/courses', async (req, res) => {
    const courses = await Course.find();

    if(!courses){
        return res.status(204).json({
            message: "Database does not have any course"
        })
    }

    return res.status(200).json({
        courses
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const signature = req.headers.authorization;
    const token = signature.slice(7, signature.length);

    const jsonData = jwt.decode(token);
    const userData = User.findOne({username: jsonData.username});

    const courseId = req.params.courseId;

    if(userData.purchased && userData.purchased.includes(courseId)){
        return res.status(409).json({
            message: "You have already bought the course"
        })
    }

    const response = await Course.findOne({ _id: courseId });

    if(!response){
        return res.send(404).json({
            message: "No course exists with the given courseId"
        });
    }

    const result = await User.updateOne({username: jsonData.username},{
        $push: {purchased: courseId}
    });

    if(!result){
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }

    return res.status(200).json({
        message: "Course purchased successfully"
    })

});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    const signature = req.headers.authorization;
    const token = signature.slice(7, signature.length);
    const purchasedCourse = [];

    const jsonData = jwt.decode(token);
    const userData = await User.findOne({username: jsonData.username});

    if(!userData.purchased.length){
        return res.status(204).json({
            message: "You haven't purchased any course yet"
        })
    }

    for(const id of userData.purchased){
        const result = await Course.findOne({_id: id});
        purchasedCourse.push(result);
    }

    return res.status(200).json({
        purchasedCourse
    });
});

module.exports = router