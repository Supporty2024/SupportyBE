// userController.js

const { signup } = require('../models/user');
const { login } = require('../models/user');

// 회원가입 컨트롤러
async function signupController(req, res) {
  const { id, passwd } = req.body;
  try {
    const user = await signup(id, passwd);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
}

// 로그인 컨트롤러
async function loginController(req, res) {
  const { id, passwd } = req.body;
  try {
    const user = await login(id, passwd);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(200).json({ message: 'User logged in successfully', user });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
}

module.exports = {
  signupController, loginController
};
