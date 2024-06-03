const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');

const Treatment = sequelize.define('Treatment', {

  id: {
    type:DataTypes.STRING(50),
    primaryKey: true,
    allowNull: false
  },

  visitId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },

  visitDate: {
    type: DataTypes.DATE,
    allowNull: true
  },

  nextVisitDate: {
    type: DataTypes.DATE,
    allowNull: true
  },

  visitMemo: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },

  hospitalName: {
    type: DataTypes.STRING(50),
    allowNull: false
  }

}, {
  tableName: 'Treatments',
  timestamps: false  // sequelize에서 자동으로 생성되는 createdAt, updatedAt 생성 방지
});


(async () => {
  try {
      await Treatment.sync();
      console.log('Treatment 모델 db 동기화');
  } catch (error) {
      console.log('Treatment 모델 db 동기화 실패');
  }
})();

// 진료 생성 함수
async function createTreatment(id, visitId, visitDate, hospitalName, visitMemo, nextVisitDate) {
  try {
    const treatment = await Treatment.create({
      id: id,
      visitId: visitId,
      visitDate: visitDate,
      hospitalName: hospitalName,
      visitMemo: visitMemo,
      nextVisitDate: nextVisitDate
     });

     // 진료 생성 성공 시
     console.log("진료 생성 성공:", treatment);
     return treatment;
  } catch (error) {
    console.error("Error creating treatment:", error);
    throw error;
  }
}

// 진료 삭제 함수
async function deleteTreatment(id, visitId) {
  try {
    const result = await Treatment.destroy({
      where: {
        id: id,
        visitId: visitId
      }
    });
    if (result === 0) {
      console.log('진료를 찾을 수 없음');
    } else {
      console.log('진료 삭제 성공');
    }
    return result;
  } catch (error) {
    console.error("Error deleting treatment:", error);
    throw error;
  }
}

// 진료 수정 함수
async function updateTreatment(id, visitId, updatedFields) {
  try {
    const result = await Treatment.update(updatedFields, {
      where: {
        id: id,
        visitId: visitId
      }
    });
    return result; // 수정된 행 수 반환
  } catch (error) {
    console.error("Error updating treatment:", error);
    throw error;
  }
}

// 진료 조회 함수
async function getTreatments(id, date) {
  try {
    const treatments = await Treatment.findAll({
      where: {
        id,
        visitDate: date
      }
    });
    return treatments;
  } catch (error) {
    console.error("Error retrieving treatments:", error);
    throw error;
  }
}


module.exports = {
  Treatment, createTreatment, deleteTreatment, updateTreatment, getTreatments };