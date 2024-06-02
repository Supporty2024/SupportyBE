const express = require('express');
const router = express.Router();
const diaryController = require('../controllers/diaryController');

router.get('/feelings/big', diaryController.getFeelings);

router.get('/feelings/mid', diaryController.getMidFeelings);

router.get('/feelings/small', diaryController.getSmallFeelings);


router.post('/posting', diaryController.postDiary);

router.get('/postingList', diaryController.postingList);


module.exports = router;