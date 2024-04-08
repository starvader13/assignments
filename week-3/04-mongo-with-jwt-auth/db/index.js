const mongoose = require('mongoose');
const mongodbURL = "mongodb+srv://admin:mongodbaccess22@cluster0.s7pwrdc.mongodb.net/jwtCourseSellingApp"

mongoose.connect(mongodbURL);

const AdminSchema = new mongoose.Schema({
    username: String,
    password: String
});

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchased: [
        {type: mongoose.Schema.Types.ObjectId},
        {ref: "course"}
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