const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/signup', userController.signupController);

router.post('/login', userController.loginController);

router.get('/logout', userController.logoutController);

router.delete('/delete', userController.deleteController);

module.exports = router;