// routes/goalRoute.js

const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goalController');

// 목표 생성
router.post('/create', goalController.createGoalController);
// 목표 조회
router.get('', goalController.getGoalsController);
// 목표 수정
router.patch('/update', goalController.updateGoalController);
// 목표 삭제
router.delete('/delete', goalController.deleteGoalController);

module.exports = router;