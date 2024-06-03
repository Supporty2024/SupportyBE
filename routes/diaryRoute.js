const express = require('express');
const router = express.Router();
const diaryController = require('../controllers/diaryController');

router.get('/feelings/big', diaryController.getFeelings);

router.get('/feelings/mid', diaryController.getMidFeelings);

router.get('/feelings/small', diaryController.getSmallFeelings);

//일기 등록
router.post('/posting', diaryController.postDiary);

//일기 수정
router.post('/editPosting', diaryController.editDiary);

//일기 목록 show
router.get('/postingList', diaryController.postingList);

//일기 삭제
router.delete('/delete', diaryController.deleteDiary);


module.exports = router;