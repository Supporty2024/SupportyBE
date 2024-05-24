// goalController.js

const { createGoal } = require('../models/goal');
const { deleteGoal } = require('../models/goal');
const { updateGoal } = require('../models/goal');

// 목표 생성 컨트롤러
async function createGoalController(req, res) {
  const { id, goalTitle, goalContent } = req.body;
  try {
    const goal = await createGoal(id, goalTitle, goalContent);
    res.status(201).json({message: 'Goal Created successfully', goal});
  } catch (error) {
    res.status(500).json({message: 'Error creating goal', error: error.message });
  }
}

// 목표 수정 컨트롤러
async function updateGoalController(req, res) {
  const { goalId } = req.params;
  const updateFields = req.body; // 클라이언트에서 전송한 수정된 필드들

  try {
    const result = await updateGoal(goalId, updateFields);
    if (result[0] === 1) {
      res.status(200).json({ message: 'Goal updated successfully' });
    } else {
      res.status(404).json({ message: 'Goal not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating goal', error: error.message });
  }
}


// 목표 삭제 컨트롤러
async function deleteGoalController(req, res) {
  const { goalId } = req.params;
  try {
    const result = await deleteGoal(goalId);
    if (result === 1) {
      res.status(200).json({ message: 'Goal deleted successfully' });
    } else {
      res.status(404).json({ message: 'Goal not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting goal', error: error.message });
  }
}

module.exports = {
  createGoalController,
  updateGoalController,
  deleteGoalController
};


