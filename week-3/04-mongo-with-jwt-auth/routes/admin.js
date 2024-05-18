const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course, User } = require("../db/index");
const jwt = require('jsonwebtoken')
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    try {
        const users = await Admin.findOne({ username });
        if (!users) {
            const response = await Admin.create({
                username,
                password
            })
            if (response) {
                res.status(201).json({ message: 'admin created successfully' });
            }
        } else {
            res.status(404).json({ message: 'admin already exists' });
        }
    } catch (error) {
        res.json({ message: 'error while creating or finding users' });
    }
});

router.post('/signin', async (req, res) => {
    // Implement admin signin logic
    const username = req.body.username;
    const password = req.body.password;
    try {
        const users = await Admin.find({ username, password });
        if (users) {
            const token = jwt.sign({
                data: username
            }, 'secret', {
                expiresIn: '1d'
            });
            res.status(200).json(token);
        } else {
            res.status(404).json({ message: 'user not found' });
        }
    } catch (error) {
        res.json({ message: 'error finding admins or signing the token' });
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const { title, description, imageLink, price } = req.body;
    try {
        const response = await Course.create({
            title,
            description,
            imageLink,
            price
        })
        if (response) {
            res.status(201).json({ message: 'course successfully created!' });
        }
    } catch (error) {
        res.json({ message: 'error while creating the course' });
    }
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    try {
        const courses = await Course.find({});
        res.status(200).json({courses: courses});
    } catch (error) {
        res.json({message: 'error while finding courses'});
    }
});

module.exports = router;