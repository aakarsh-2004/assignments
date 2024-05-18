const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const { username, password } = req.body;
    try {
        const res = await User.find({username: username});
        if(res){
            res.status(200).json({message: 'User already exists!'});
        } else {
            const response = await User.create({username, password});
            if(response){
                res.status(201).json({message: 'User created successfully'});
            }
        }
    } catch (error) {
        res.status(404).json({message: 'cannot find user'});
    }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    try {
        const courses = await Course.find({});
        res.status(200).json(courses);
    } catch (error) {
        res.status(404).json({message: 'cannot find courses'});
    }
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;

    try {
        const operation = await User.updateOne({ 
            username: username
        }, {
            "$push": {
                purchasedCourses: courseId
            }
        });
        if(operation){
            res.status(201).json({message: 'purchase completed'});
        }
    } catch (error) {
        res.status(404).json({message: 'cannot update user'});
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.headers.username;
    try {
        const user = await User.findOne({username: username});
        if(user){
            res.status(200).json(user.purchasedCourses);
        } else {
            res.status(404).json({message: 'user does not exists!'});
        }
    } catch (error) {
        res.status(404).json({message: 'cannot find users'});
    }
});

module.exports = router