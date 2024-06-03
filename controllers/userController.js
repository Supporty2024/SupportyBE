// userController.js

const { signup, login, deleteId, checkId } = require('../models/user');

// 회원가입 컨트롤러
async function signupController(req, res) {
  const { id, passwd } = req.body;
  try {
    const user = await signup(id, passwd);
    res.status(201).json({ message: 'User registered successfully', user});
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
}

//아이디 중복 컨트롤러 
async function checkIdController(req, res) {
  const { id } = req.query;
  console.log('중복 컨트롤러 호출됨');
  console.log('id:', id);
  try {
    console.log('checkid 호출 전');
      const available = await checkId(id);
      console.log('available:', available);
      res.status(200).json(available);
  } catch (error) {
      res.status(500).send("unable Id");
  }
}


// 로그인 컨트롤러
async function loginController(req, res) {
  const { id, passwd } = req.body;
  console.log(id);
  try {
    const user = await login(id, passwd);
    console.log('User registered successfully:', user);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(200).json({ message: 'User logged in successfully', user});
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
}

//로그아웃 컨트롤러
async function logoutController(req, res) {
  // 세션 삭제
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ message: 'Error logging out', error: err.message });
    } else {
      res.status(200).json({ message: 'User logged out successfully' });
    }
  });
}
//회원탈퇴 컨트롤러
async function deleteController(req, res) {
  const { id } = req.query;
  try {
    await deleteId(id); // 회원 삭제 함수 호출
    res.status(200).send("User deleted successful");
  } catch (error) {
    res.status(500).send("User not deleted successful");
  }
} 

module.exports = {
  signupController, checkIdController,
   loginController, logoutController,
  deleteController
};
