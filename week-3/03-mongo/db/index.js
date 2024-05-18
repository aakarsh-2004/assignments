const mongoose = require('mongoose');

// Connect to MongoDB
mongoose
    .connect('mongodb+srv://root:toor@app.ak9uqfb.mongodb.net/course-selling-app?retryWrites=true&w=majority&appName=app')
    .then(() => {
        console.log(`Successfully connected to the database`);
    })

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String,
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title: String,
    description: String,
    imageLink: String,
    price: Number
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);


module.exports = {
    Admin,
    User,
    Course
}