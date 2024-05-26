// goalService.js

const { Goal } = require('../models/goal');

const getAllGoals = async (userId) => {
  try {
    const goals = await Goal.findAll({ where: { userId } });
    return goals;
  } catch (error) {
    throw new Error('목표를 조회하는 도중 오류가 발생했습니다.');
  }
};

const getGoalById = async (userId, goalId) => {
    try {
        const goal = await Goal.findOne({ where: { userId, goal_id: goalId } });
        if (!goal) {
          throw new Error('해당 ID의 목표를 찾을 수 없습니다.');
        }
        return goal;
      } catch (error) {
        throw new Error('목표를 조회하는 도중 오류가 발생했습니다.');
      }
};

const createGoal = async (userId, goalData) => {
  try {
    goalData.userId = userId;
    const newGoal = await Goal.create(goalData);
    return newGoal;
  } catch (error) {
    throw new Error('새로운 목표를 생성하는 도중 오류가 발생했습니다.');
  }
};

const updateGoal = async (userId, goalId, updatedData) => {
  try {
    const goal = await Goal.findOne({ where: { userId, goal_id: goalId } });
    if (!goal) {
      throw new Error('해당 ID의 목표를 찾을 수 없습니다.');
    }
    await goal.update(updatedData);
    return goal;
  } catch (error) {
    throw new Error('목표를 수정하는 도중 오류가 발생했습니다.');
  }
};

const deleteGoal = async (userId, goalId) => {
  try {
    const goal = await Goal.findOne({ where: { userId, goal_id: goalId } });
    if (!goal) {
      throw new Error('해당 ID의 목표를 찾을 수 없습니다.');
    }
    await goal.destroy();
    return '목표가 성공적으로 삭제되었습니다.';
  } catch (error) {
    throw new Error('목표를 삭제하는 도중 오류가 발생했습니다.');
  }
};

module.exports = {
  getAllGoals,
  createGoal,
  updateGoal,
  deleteGoal,
  getGoalById
};
