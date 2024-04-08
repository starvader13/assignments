require('dotenv').config();
const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const zod = require("zod");
const { Admin, Course } = require("../db/index");
const jwt = require("jsonwebtoken");

const jwtPassword = process.env.jwtPassword;
const router = Router();

const signAdminSchema = zod.object({
    username: zod.string(),
    password: zod.string()
})

const courseAdminHeaderSchema = zod.string();

const courseAdminBodySchema = zod.object({
    title: zod.string(),
    description: zod.string(),
    price: zod.number(),
    imageLink: zod.string(),
    published: zod.boolean()
});

function inputAuthVerifySignSchema (req, res, next){
    const jsonBodyData = req.body;

    if(!signAdminSchema.safeParse(jsonBodyData).success){
        return res.status(403).json({
            msg: "The username or password is invalid"
        });
    }

    next();
}

function inputAuthVerifyCourseHeaderSchema(req, res, next){
    const token = req.headers.authorization;

    if(!courseAdminHeaderSchema.safeParse(token).success){
        return res.status(401).json({
            message: "Authorization Failed"
        })
    }

    next();
}

function inputAuthVerifyCourseBodySchema(req, res, next){
    const jsonBodyData = req.body;

    if(!courseAdminBodySchema.safeParse(jsonBodyData).success){
        return res.status(404).json({
            message: "Body contains missing field"
        });
    }

    next();
}

router.post('/signup', inputAuthVerifySignSchema, async (req, res) => {
    const jsonBodyData = req.body;

    const response = await Admin.findOne({username: jsonBodyData.username});

    if(response){
        return res.status(409).json({
            message: "The username is already registered."
        })
    }

    const adminData = new Admin(jsonBodyData);
    const result = await adminData.save();

    if(!result){
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }

    return res.status(200).json({
        message: "Admin Created Successfully"
    });
});

router.post('/signin', inputAuthVerifySignSchema, async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const response = await Admin.findOne({username: username, password: password});

    if(!response){
        return res.status(401).json({
            message: "Either the username or password is incorrect"
        });
    }
    const signature = "Bearer " + jwt.sign({username: username}, jwtPassword);

    return res.status(200).json({
        token: signature
    });
});

router.use(inputAuthVerifyCourseHeaderSchema);

router.post('/courses', inputAuthVerifyCourseBodySchema, adminMiddleware, async (req, res) => {
    const jsonBodyData = req.body;

    const courseData = new Course(jsonBodyData);
    const response = await courseData.save();

    if(!response){
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }

    return res.status(200).json({
        message: "Course created successfully",
        courseId: response._id
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    const courses = await Course.find();

    if(!courses){
        return res.status(200).json({
            message: "No courses are available"
        })
    }

    return res.status(200).json({
        courses
    });
});

module.exports = router;