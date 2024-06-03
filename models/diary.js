const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database'); //원래는 sequelize

const Diary = sequelize.define('Diary', {
    diary_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id: {
        type: DataTypes.STRING(50),
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    diary_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    diary_content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    big_feeling: {
        type: DataTypes.STRING(20),
        allowNull: false,
        references: {
            model: 'Big_feelings',
            key: 'big_feeling'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    mid_feeling: {
        type: DataTypes.STRING(20),
        allowNull: false,
        references: {
            model: 'Mid_feelings',
            key: 'mid_feeling'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    small_feeling: {
        type: DataTypes.STRING(20),
        allowNull: false,
        references: {
            model: 'Small_feelings',
            key: 'small_feeling'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, {
    timestamps: false
});

//일기 등록 함수
async function posting(id, diary_date, diary_content, big_feeling, mid_feeling, small_feeling) {
    try {
        const existDiary = await Diary.findOne({ where: { id, diary_date } });
        if(existDiary) {
            console.log("존재하는 일기");
            return null;
        }
        const diary = await Diary.create({
            id,
            diary_date,
            diary_content,
            big_feeling,
            mid_feeling,
            small_feeling
        });
        console.log('diary 등록 성공');
        
        return diary; 
    } catch (error) {
        console.error('diary 등록 에러', error);
        throw error;
    }
}

async function editPosting(id, diary_date, diary_content, big_feeling, mid_feeling, small_feeling) {
    try {
        const diary = await Diary.findOne({ where: { id, diary_date } });
        if (!diary) {
            console.log("해당 일기를 찾을 수 없음");
            return null;
        }

        // 수정할 내용 업데이트
        diary.diary_content = diary_content;
        diary.big_feeling = big_feeling;
        diary.mid_feeling = mid_feeling;
        diary.small_feeling = small_feeling;

        // 변경 사항 저장
        await diary.save();

        console.log('일기 수정 성공');
        return diary;
    } catch (error) {
        console.error('일기 수정 에러', error);
        throw error;
    }
}

//일기 목록들 보내주는 함수
async function listPosting(id) {
    try {
        const list = await Diary.findAll({where: {id}});
        return list;
    } catch(error) {
        console.log(error);
        throw error;
    }
}

async function diaryDelete(id, diary_date) {
    try {
        const diary = await Diary.findOne({where: {id, diary_date}});
        if(!diary) {
            throw new Error('Diary not found');
        }
        await diary.destroy({
            truncate:true,
        });
        console.log("일기 삭제 완료");
    } catch(error) {
        console.error('일기 삭제 오류', error);
        throw error;
    }
}
module.exports = { Diary, posting, editPosting, listPosting, diaryDelete };
