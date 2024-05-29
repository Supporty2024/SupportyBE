const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');

// BigFeeling 모델 정의
const BigFeeling = sequelize.define('BigFeeling', {
    big_feeling_num: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    big_feeling: {
        type: DataTypes.STRING(10),
        allowNull: false
    }
}, {
    tableName: 'Big_feelings',
    timestamps: false
});

// MidFeeling 모델 정의
const MidFeeling = sequelize.define('MidFeeling', {
    mid_feeling_num: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    mid_feeling: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    big_feeling_num: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: BigFeeling,
            key: 'big_feeling_num'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, {
    tableName: 'Mid_feelings',
    timestamps: false
});

// SmallFeeling 모델 정의
const SmallFeeling = sequelize.define('SmallFeeling', {
    small_feeling_num: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    small_feeling: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    big_feeling_num: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: BigFeeling,
            key: 'big_feeling_num'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    mid_feeling_num: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: MidFeeling,
            key: 'mid_feeling_num'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, {
    tableName: 'Small_feelings',
    timestamps: false
});

// // 관계 설정
// BigFeeling.hasMany(MidFeeling, { foreignKey: 'big_feeling_num' });
// MidFeeling.belongsTo(BigFeeling, { foreignKey: 'big_feeling_num' });

// BigFeeling.hasMany(SmallFeeling, { foreignKey: 'big_feeling_num' });
// SmallFeeling.belongsTo(BigFeeling, { foreignKey: 'big_feeling_num' });

// MidFeeling.hasMany(SmallFeeling, { foreignKey: 'mid_feeling_num' });
// SmallFeeling.belongsTo(MidFeeling, { foreignKey: 'mid_feeling_num' });

module.exports = { BigFeeling, MidFeeling, SmallFeeling };
