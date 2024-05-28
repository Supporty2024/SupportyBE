const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');

const Goal = sequelize.define('Goal', {

  id: {
    type:DataTypes.STRING(50),
    primaryKey: true,
    allowNull: false
  },

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
}, {
  tableName: 'Goals',
  timestamps: false  // sequelize에서 자동으로 생성되는 createdAt, updatedAt 생성 방지
});


(async () => {
  try {
      await Goal.sync();
      console.log('Goal 모델 db 동기화');
  } catch (error) {
      console.log('Goal 모델 db 동기화 실패');
  }
})();

// 목표 생성 함수
async function createGoal(id, goalId, goalTitle, goalContent, isAchieved, goalDate) {
  try {
    //const goalId = generateRandomGoalId();
    //const isAchieved = false; // 기본값으로 false 설정
    //const goalDate = new Date();

    const goal = await Goal.create({
      id: id,
      goalId: goalId,
      goalTitle: goalTitle,
      goalContent: goalContent,
      isAchieved: isAchieved,
      goalDate: goalDate
     });

     // 목표 생성 성공 시
     console.log("목표 생성 성공:", goal);
     return goal;
  } catch (error) {
    console.error("Error creating goal:", error);
    throw error;
  }
}

// 목표 삭제 함수
async function deleteGoal(id, goalId) {
  try {
    const result = await Goal.destroy({
      where: {
        id: id,
        goalId: goalId
      }
    });
    if (result === 0) {
      console.log('목표를 찾을 수 없음');
    } else {
      console.log('목표 삭제 성공');
    }
    return result;
  } catch (error) {
    console.error("Error deleting goal:", error);
    throw error;
  }
}

// 목표 수정 함수
async function updateGoal(id, goalId, updatedFields) {
  try {
    const result = await Goal.update(updatedFields, {
      where: {
        id: id,
        goalId: goalId
      }
    });
    return result; // 수정된 행 수 반환
  } catch (error) {
    console.error("Error updating goal:", error);
    throw error;
  }
}

// 목표 조회 함수
async function getGoals(id, date) {
  try {
    const goals = await Goal.findAll({
      where: {
        id,
        goalDate: date
      }
    });
    return goals;
  } catch (error) {
    console.error("Error retrieving goals:", error);
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

module.exports = {
  Goal, createGoal, deleteGoal, updateGoal, getGoals };