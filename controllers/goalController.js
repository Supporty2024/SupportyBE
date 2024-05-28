// goalController.js

const { createGoal, deleteGoal, updateGoal, getGoals } = require('../models/goal');
const Goal = require('../models/goal');

// 목표 생성 컨트롤러
async function createGoalController(req, res) {
  const { id } = req.query;
  const { goalId, goalTitle, goalContent, isAchieved, goalDate } = req.body;
  console.log("createGoalController 호출:", {id, goalId, goalTitle, goalContent, isAchieved, goalDate});
  try {
    const goal = await createGoal(id, goalId, goalTitle, goalContent, isAchieved, goalDate);
    res.status(201).json({message: 'Goal Created successfully', goal});
    console.log('목표 생성 성공..');
  } catch (error) {
    res.status(500).json({message: 'Error creating goal', error: error.message });
    console.log('목표 생성 실패..');
  }
}

// 목표 수정 컨트롤러
async function updateGoalController(req, res) {
  const { id, goalId } = req.query;
  const updateFields = req.body; // 클라이언트에서 전송한 수정된 필드들
  console.log('updateGoalController 호출:', 'id:', id, 'goalId:', goalId);

  try {
    const result = await updateGoal(id, goalId, updateFields);
    if (result[0] === 1) {
      res.status(200).json({ message: 'Goal updated successfully' });
      console.log('목표 수정 성공..');
    } else {
      res.status(404).json({ message: 'Goal not found' });
      console.log('수정할 목표 찾을 수 없음..');
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating goal', error: error.message });
    console.log('목표 수정 실패..');
  }
}


// 목표 삭제 컨트롤러
async function deleteGoalController(req, res) {
  const { id, goalId } = req.query;
  console.log('deleteGoalController 호출:', 'id:', id, 'goalId:', goalId);
  try {
    const result = await deleteGoal(id, goalId);
    if (result === 1) {
      res.status(200).json({ message: 'Goal deleted successfully' });
      console.log('목표 삭제 성공..');
    } else {
      res.status(404).json({ message: 'Goal not found' });
      console.log('삭제할 목표 찾을 수 없음..');
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting goal', error: error.message });
    console.log('목표 삭제 실패..');
  }
}

// 목표 조회 컨트롤러
async function getGoalsController(req, res) {
  const { id, goalDate } = req.query;
  console.log('getGoalsController 호출:', 'id:', id, 'goalDate:', goalDate);
  try {
    const goals = await getGoals(id, goalDate);
    res.status(200).json(goals);
    console.log('해당 날짜 목표 조회 성공');
  } catch (error) {
    res.status(500).json ({ message: 'Error retrieving goals', error: error.message });
    console.log('해당 날짜 목표 조회 실패');
  }
}

module.exports = {
  createGoalController,
  updateGoalController,
  deleteGoalController,
  getGoalsController
};
