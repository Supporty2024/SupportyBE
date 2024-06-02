const { BigFeeling, MidFeeling, SmallFeeling } = require('../models/feeling');
const { posting } = require('../models/diary');
const { listPosting } = require('../models/diary');

// BigFeeling 은 전부 다 보내줌
const getFeelings = async (req, res) => {
    try {
        const bigFeelings = await BigFeeling.findAll({
            attributes: ['big_feeling']
        });
        res.status(200).json(bigFeelings);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

// MidFeeling 찾는 함수
const getMidFeelings = async (req, res) => {
    try {
        const { big_feeling } = req.query; // 변수 이름을 big_feeling로 변경
        //big_feelings 테이블에서 req에 있는 애를 찾기
        const bigFeelingData = await BigFeeling.findOne({
            where: { big_feeling: big_feeling }, // 변수 이름을 big_feeling로 변경
            attributes: ['big_feeling']
        });

        const midFeelings = await MidFeeling.findAll({
            where: { big_feeling: bigFeelingData.big_feeling }, // 변수 이름을 big_feeling_num으로 변경
            attributes: ['mid_feeling']
        });

        res.status(200).json(midFeelings);
    } catch(error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};

// SmallFeeling 찾는 함수
const getSmallFeelings = async (req, res) => {
    try {
        const {mid_feeling} = req.query;
        const midFeelingData = await MidFeeling.findOne({
            where: {mid_feeling: mid_feeling},
            attributes: ['mid_feeling']
        });

        const smallFeelings = await SmallFeeling.findAll({
            where: {mid_feeling: midFeelingData.mid_feeling},
            attributes: ['small_feeling']
        });
        res.status(200).json(smallFeelings);

    } catch(error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
}

//일기 등록
async function postDiary(req, res) {
    const {
        id, diary_date, diary_content,
        big_feeling, mid_feeling, small_feeling
    } = req.body;
    try{
        const diary = await posting(id, diary_date, diary_content, big_feeling, mid_feeling, small_feeling);
        if(diary == null) {
            res.status(409).json({message: "등록된 날짜"});
        }
        else {res.status(200).json(diary);}
    } catch(error) {
        console.log(error);
        res.status(500).json(error);
    }
}

async function postingList(req,res) {
    const { id } = req.query;

    try {
        const list = await listPosting(id);
        res.status(200).json(list);
    } catch(error) {
        console.log(error);
        res.status(500).json(error);
    }
}


module.exports = { getFeelings, getMidFeelings, getSmallFeelings, postDiary, postingList };
