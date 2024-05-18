const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index");
const jwt = require('jsonwebtoken');


// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const { username, password } = req.body;
    try {
        const users = await User.find({username});
        if(users.length){
            res.json({message: 'user already exists'});
        } else {
            const response = await User.create({
                username, 
                password
            })
            if(response){
                res.status(201).json({message: 'user created successfully'});
            }
        }
    } catch (error) {
        res.json({message: 'error while finding or creating users'})
    }
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const { username, password } = req.body;
    try {
        const users = await User.findOne({username, password});
        if(users){
            const token = jwt.sign({
                data: username
            }, 'secret', {
                expiresIn: '1d'
            })
            res.status(200).json(token);
        }
    } catch (error) {
        res.json({message: 'error while finding user or signing the token'});
    }
});

router.get('/courses', userMiddleware, async (req, res) => {
    // Implement listing all courses logic
    try {
        const courses = await Course.find({});
        if(courses){
            res.status(200).json({courses: courses});
        }
    } catch (error) {
        res.json({message: 'error while finding the course'});
    }
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const token = req.headers.authorization.split(' ')[1]
    const username = jwt.verify(token, 'secret').data;
    try {
        const response = await User.updateOne({
            username: username
        }, {
            "$push": {
                purchasedCourse: courseId
            }
        });
        if(response){
            res.status(201).json({message: 'Course added successfully'});
        }
    } catch (error) {
        res.json({message: 'error while purchasing the course'});
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const token = req.headers.authorization.split(' ')[1];
    try {
        const username = jwt.verify(token, 'secret').data;
        const response = await User.findOne({username: username});
        if(response){
            res.json(response.purchasedCourse);
        }
    } catch (error) {
        res.json({message: 'error while finding the user (perhaps wrong token)'});
    }
});

module.exports = router