const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');

const Goal = sequelize.define('Goal', {
  goalId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },

  goalTitle: {
    type: DataTypes.STRING(30),
    allowNull: false
  },

  goalContent: {
    type: DataTypes.TEXT,
    allowNull: false
  },

  isAchieved: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },

  goalDate: {
    type: DataTypes.DATE,
    allowNull: false
  }
});


(async () => {
  try {
      await Goal.sync();
      console.log('Goal 모델 db 동기화');
  } catch (error) {
      console.log('Goal 모델 db 동기화 실패');
  }
})();

// 목표 생성(추가) 함수
async function createGoal(id, goalTitle, goalContent) {
  try {
    const goalId = generateRandomGoalId();
    const isAchieved = false; // 기본값으로 false 설정
    const goalDate = new Date();

    const goal = await Goal.create({
      id: id,
      goalId: goalId,
      goalTitle: goalTitle,
      goalContent: goalContent,
      isAchieved: isAchieved,
      goalDate: goalDate
     });

     // 목표 생성 성공 시
     return goal;
  } catch (error) {
    console.error("Error creating goal:", error);
    throw error;
  }
}

// 목표 삭제 함수
async function deleteGoal(goalId) {
  try {
    const result = await Goal.destroy({
      where: {
        goalId: goalId
      }
    });
    return result; // 삭제된 행 수 반환
  } catch (error) {
    console.error("Error deleting goal:", error);
    throw error;
  }
}

// 목표 수정 함수
async function updateGoal(goalId, updatedFields) {
  try {
    const result = await Goal.update(updatedFields, {
      where: {
        goalId: goalId
      }
    });
    return result; // 수정된 행 수 반환
  } catch (error) {
    console.error("Error updating goal:", error);
    throw error;
  }
}


// 랜덤 goalId 생성 함수
function generateRandomGoalId() {
  // 랜덤한 문자열 생성
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const length = 10;
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
