const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const userController = require('../controllers/post.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createPostSchema, updateUserSchema, validateLogin } = require('../middleware/validators/postValidator.middleware');


router.get('/', auth(), awaitHandlerFactory(postController.getAllPosts)); // localhost:3000/api/v1/posts
router.get('/id/:id', auth(), awaitHandlerFactory(userController.getUserById)); // localhost:3000/api/v1/users/id/1
router.get('/username/:username', auth(), awaitHandlerFactory(userController.getUserByuserName)); // localhost:3000/api/v1/users/username/julia
router.get('/whoami', auth(), awaitHandlerFactory(userController.getCurrentUser)); // localhost:3000/api/v1/users/whoami
router.post('/id/:id', auth(), createPostSchema, awaitHandlerFactory(postController.createPost)); // localhost:3000/api/v1/posts/id/1
router.patch('/id/:id', auth(Role.admin), updateUserSchema, awaitHandlerFactory(userController.updateUser)); // localhost:3000/api/v1/users/id/1 , using patch for partial update
router.delete('/id/:id', auth(Role.admin), awaitHandlerFactory(userController.deleteUser)); // localhost:3000/api/v1/users/id/1


router.post('/login', validateLogin, awaitHandlerFactory(userController.userLogin)); // localhost:3000/api/v1/users/login

module.exports = router;