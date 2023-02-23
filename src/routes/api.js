const express = require('express');
const blogController = require('../controllers/blogController');
const UserController = require('../controllers/userController');
const userAuth = require('../middlewares/userAuth')


const router = express.Router();


// user api end point 
router.post('/createUser', UserController.userRegistration);
router.post('/userLogin', UserController.userLogin);
router.get('/selectUser', userAuth, UserController.selectUser);


// blog api endpoint
router.post('/createBlog', userAuth, blogController.createBlog);
router.get('/selectBlog', userAuth, blogController.selectBlog);
router.get('/updateBlog', userAuth, blogController.updateBlog);
router.get('/deleteBlog', userAuth, blogController.deleteBlog);










module.exports = router;