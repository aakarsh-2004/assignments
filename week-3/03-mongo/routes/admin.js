const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db/index");
const router = Router();
const mongoose = require('mongoose');

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    try {
        const res = await Admin.findOne({username: username});
        if(res){
            res.status(200).json({message: 'user already exists!'})
        } else {
            const response = await Admin.create({
                username: username,
                password: password
            });
            res.status(201).json(response);
        }
    } catch (error) {
        res.status(404).json({message: 'cannot create user'});
    }

});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const { title, description, imageLink, price } = req.body;
    try {
        const response = await Course.create({title, description, imageLink, price});
        res.status(201).json(response);
    } catch (error) {
        res.status(404).json({message: 'Could not create course'});
    }
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    try {
        const courses = await Course.find({});
        res.status(200).json({courses: courses});
    } catch (error) {
        res.status(404).json({message: 'Could not find courses'});
    }

});

module.exports = router;