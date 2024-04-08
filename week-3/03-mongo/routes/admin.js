const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db/index")
const zod = require("zod");

const router = Router();

const signupObjSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
})

const coursesObjSchema = zod.object({
    title:  zod.string(),
    description: zod.string(),
    price: zod.number(),
    imageLink: zod.string(),
    published: zod.boolean()
})

function userInputValidation(req, res, next){
    const jsonHeaderData = req.body;
    const schemaResponse = signupObjSchema.safeParse(jsonHeaderData);
    if(!(schemaResponse.success)){
        return res.status(403).json({
            msg: "The username or password is invalid"
        });
    }

    next();
}

function courseHeaderInputValidation(req, res, next){
    const jsonHeaderData = req.headers;

    if(!signupObjSchema.safeParse(jsonHeaderData).success){
        return res.status(403).json({
            msg: "The username or password is invalid"
        });
    }
    next();
}

function courseBodyInputValidation(req, res, next){
    const jsonBodyData= req.body;

    if(!coursesObjSchema.safeParse((jsonBodyData)).success){
        return res.status(404).json({
            msg: "The details of the book has missing details"
        });
    }

    next();
}

// Admin Routes
router.post('/signup', userInputValidation, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const adminData = new Admin({
        username: username,
        password: password
    })

    adminData.save()
        .then(()=>{
            return res.status(200).json({
                message: "Admin Created Successfully"
            });
        })
        .catch(()=>{
            return res.status(404).json({
                message: "Internal Server Error"
            });
        })
});

router.use(courseHeaderInputValidation)
router.post('/courses', courseBodyInputValidation, adminMiddleware, async (req, res) => {
    const jsonBodyData = req.body;

    const courseData = new Course(jsonBodyData);

    const response = await courseData.save();

    if(!response){
        return res.status(500).json({
            msg: "Internal Server Error"
        });
    }

    return res.status(200).json({
        msg: "Course Created Successfully",
        course_id: response.id
    });
});

router.get('/courses', adminMiddleware, async (req, res) => {
    const courses = await Course.find();

    if(!courses){
        return res.status(204).json({
            msg: "Database does not have any content"
        });
    }

    return res.status(200).json({
        courses
    });
});

module.exports = router;