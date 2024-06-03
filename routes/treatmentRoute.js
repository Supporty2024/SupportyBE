// routes/treatmentRoute.js

const express = require('express');
const router = express.Router();
const treatmentController = require('../controllers/treatmentController');

// 진료 생성
router.post('/create', treatmentController.createTreatmentController);
// 진료 조회
router.get('', treatmentController.getTreatmentsController);
// 진료 수정
router.patch('/update', treatmentController.updateTreatmentController);
// 진료 삭제
router.delete('/delete', treatmentController.deleteTreatmentController);

module.exports = router;