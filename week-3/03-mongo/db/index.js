const mongoose = require('mongoose');
const mongodbUrl = "mongodb+srv://admin:mongodbaccess22@cluster0.s7pwrdc.mongodb.net/courseSellingApp";

// Connect to MongoDB
mongoose.connect(mongodbUrl);

// Define schemas
const AdminSchema = new mongoose.Schema({
    username: String,
    password: String
});

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchased: [
        {type: mongoose.Schema.Types.ObjectId},
        {ref: "Course"}
    ]
});

const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}