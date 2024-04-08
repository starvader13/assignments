const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const zod = require("zod");
const { User, Course } = require("../db/index");

const signupObjSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
})
function userInputValidation(req, res, next){
    const jsonHeaderData = req.body;
    const schemaResponse = signupObjSchema.safeParse(jsonHeaderData);
    if(!(schemaResponse.success)){
        return res.status(403).json({
            message: "The username or password is invalid"
        });
    }

    next();
}
router.post('/signup', userInputValidation, async (req, res) => {
    const jsonData = req.body;

    const userData = new User(jsonData);
    const response = await userData.save();

    if(!response){
        res.status(404).json({
            message: "Internal Server Error"
        });
    }

    res.status(200).json({
        message: "User Created Successfully"
    });
});

router.get('/courses', userInputValidation, async (req, res) => {
    const courses = await Course.find();

    if(!courses){
        return res.status(204).json({
            message: "Database does not have any content"
        });
    }

    return res.status(200).json({
        courses
    });
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const username = req.headers.username;
    const courseId = req.params.courseId;

    const response = await User.findOne({username: username});

    if(response.purchased && response.purchased.includes(courseId)){
        return res.status(409).json({
            message: "You have already bought the course"
        })
    }

    const updatedUser = await User.updateOne({username: username},{
        $push: { purchased: courseId }
    });

    if(updatedUser.nmodified){
        res.status(500).json({
            message: "Internal Server Error"
        });
    }

    res.status(200).json({
        message: "Course Purchased successfully"
    })
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    const username = req.headers.username;
    const purchasedCourses=[];
    const response = await User.findOne({username: username});

    if(!response.purchased){
        return res.status(204).json({
            message: "You haven't purchased any course yet"
        });
    }

    for(const id of response.purchased){
        const result = await Course.findOne({_id: id});
        purchasedCourses.push(result);
    }

    return res.status(200).json({
        purchasedCourses
    })

});

module.exports = router