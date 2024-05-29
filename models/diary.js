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
    big_feeling_num: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Big_feelings',
            key: 'big_feeling_num'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    mid_feeling_num: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references : {
            model: 'Mid_feelings',
            key: 'mid_feeling_num'
        },
        onDelete : 'CASCADE',
        onUpdate: 'CASCADE'
    },
    small_feeling_num: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references : {
            model: 'Small_feelings',
            key: 'small_feeling_num'
        },
        onDelete : 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, {
    timestamps: false
});