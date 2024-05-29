const { BigFeeling, MidFeeling, SmallFeeling } = require('../models/feeling');

// BigFeeling 찾는 함수
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
        const bigFeelingData = await BigFeeling.findOne({
            where: { big_feeling: big_feeling }, // 변수 이름을 big_feeling로 변경
            attributes: ['big_feeling_num']
        });

        const midFeelings = await MidFeeling.findAll({
            where: { big_feeling_num: bigFeelingData.big_feeling_num }, // 변수 이름을 big_feeling_num으로 변경
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
        // console.log("작은 감정");
        // console.log(req.query);
        const {mid_feeling} = req.query;
        const midFeelingData = await MidFeeling.findOne({
            where: {mid_feeling: mid_feeling},
            attributes: ['mid_feeling_num']
        });

        const smallFeelings = await SmallFeeling.findAll({
            where: {mid_feeling_num : midFeelingData.mid_feeling_num},
            attributes: ['small_feeling']
        });
        res.status(200).json(smallFeelings);

    } catch(error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
}

module.exports = { getFeelings, getMidFeelings, getSmallFeelings };
