// middlewares/errorMiddleware.js

// 오류 처리 미들웨어
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: '서버 오류 발생' }); // 클라이언트에게 오류 응답 보내기
  };
  
  module.exports = errorHandler;
  