// utils/databse.js

require('dotenv').config();

const { Sequelize } = require('sequelize');

// 데이터베이스 연결에 필요한 설정
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  });

// 데이터베이스 연결 테스트
async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log('데이터베이스 연결에 성공했습니다.');
  } catch (error) {
    console.error('데이터베이스에 연결할 수 없습니다.', error);
  }
}

// 데이터베이스 연결 설정 내보내기
module.exports = {
    sequelize,
    testDatabaseConnection
};
