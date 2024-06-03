// treatmentController.js

const { createTreatment, deleteTreatment, updateTreatment, getTreatments } = require('../models/treatment');
const Treatment = require('../models/treatment');

// 진료 생성 컨트롤러
async function createTreatmentController(req, res) {
  const { id } = req.query;
  const { visitId, visitDate , hospitalName, visitMemo, nextVisitDate} = req.body;
  console.log("createTreatmentController 호출:", {id, visitId, visitDate, hospitalName, visitMemo, nextVisitDate});
  try {
    const treatment = await createTreatment(id, visitId, visitDate, hospitalName, visitMemo, nextVisitDate);
    res.status(201).json({message: 'Treatment Created successfully', treatment});
    console.log('진료 생성 성공..');
  } catch (error) {
    res.status(500).json({message: 'Error creating treatment', error: error.message });
    console.log('진료 생성 실패..');
  }
}

// 진료 수정 컨트롤러
async function updateTreatmentController(req, res) {
  const { id, visitId } = req.query;
  const updateFields = req.body; // 클라이언트에서 전송한 수정된 필드들
  console.log('updateTreatmentController 호출:', 'id:', id, 'visitId:', visitId);

  try {
    const result = await updateTreatment(id, visitId, updateFields);
    if (result[0] === 1) {
      res.status(200).json({ message: 'Treatment updated successfully' });
      console.log('진료 수정 성공..');
    } else {
      res.status(404).json({ message: 'Treatment not found' });
      console.log('수정할 진료 찾을 수 없음..');
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating treatment', error: error.message });
    console.log('id: ', id, 'visitId: ', visitId, 'updateFields: ', updateFields);
    console.log('진료 수정 실패..');
  }
}


// 진료 삭제 컨트롤러
async function deleteTreatmentController(req, res) {
  const { id, visitId } = req.query;
  console.log('deleteTreatmentController 호출:', 'id:', id, 'visitId:', visitId);
  try {
    const result = await deleteTreatment(id, visitId);
    if (result === 1) {
      res.status(200).json({ message: 'Treatment deleted successfully' });
      console.log('진료 삭제 성공..');
    } else {
      res.status(404).json({ message: 'Treatment not found' });
      console.log('삭제할 진료 찾을 수 없음..');
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting treatment', error: error.message });
    console.log('진료 삭제 실패..');
  }
}

// 진료 조회 컨트롤러
async function getTreatmentsController(req, res) {
  const { id, visitDate } = req.query;
  console.log('getTreatmentsController 호출:', 'id:', id, 'visitDate:', visitDate);
  try {
    const treatments = await getTreatments(id, visitDate);
    res.status(200).json(treatments);
    console.log('해당 날짜 진료 조회 성공');
  } catch (error) {
    res.status(500).json ({ message: 'Error retrieving treatments', error: error.message });
    console.log('해당 날짜 진료 조회 실패');
  }
}

module.exports = {
  createTreatmentController,
  updateTreatmentController,
  deleteTreatmentController,
  getTreatmentsController
};
