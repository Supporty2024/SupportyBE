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


async function posting(id, diary_date, diary_content, big_feeling, mid_feeling, small_feeling) {
    try {
        const existDiary = await Diary.findOne({ where: { diary_date } });
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

async function listPosting(id) {
    try {
        const list = await Diary.findAll({where: {id}});
        return list;
    } catch(error) {
        console.log(error);
        throw error;
    }
}
module.exports = { Diary, posting, listPosting };
