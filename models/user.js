// 랜덤 닉네임 생성 함수
const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database'); //원래는 sequelize
const bcrypt = require('bcrypt');

//랜덤 닉네임 생성
function generateRandomNickname() {
    const adjectives = ['행복한', '멋있는', '똑똑한', '용기있는', '침착한', '행운의', '햇살의', '귀여운', '진지한', '여유로운'];
    const nouns = ['고양이', '개', '펭귄', '돌고래', '사자', '호랑이', '고슴도치', '꿀벌', '판다', '코알라'];

    const randomAdjectiveIndex = Math.floor(Math.random() * adjectives.length);
    const randomNounIndex = Math.floor(Math.random() * nouns.length);

    const randomAdjective = adjectives[randomAdjectiveIndex];
    const randomNoun = nouns[randomNounIndex];

    const randomNickname = randomAdjective + randomNoun;
    return randomNickname;
}

const User = sequelize.define('User', {
    id: {
        type:DataTypes.STRING(50),
        primaryKey: true,
        allowNull: false
    },
    passwd: {
        type:DataTypes.STRING(100),
        allowNull: false
    },
    nickname: {
        type:DataTypes.STRING(20),
        allowNull:false
    },
    join_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    timestamps: false
});

(async () => {
    try {
        await User.sync();
        console.log('User모델 db 동기화');
    } catch (error) {
        console.log('User 모델 db 동기화 실패');
    }
})();

//회원가입 함수
async function signup(id, passwd) {
    try {
        const randomNickname = generateRandomNickname();
        const joinDate = new Date();
        const hashedPassword = await bcrypt.hash(passwd, 10);

        const user = await User.create({id, passwd:hashedPassword, nickname:randomNickname, join_date: joinDate});
        console.log('User 등록 성공');
        return user;
    } catch (error) {
        console.error('User 등록 에러', error);
        throw error;
    }
}

//로그인 함수
async function login(id, passwd) {
    try {
        if(!id) {
            throw new Error('아이디 비어있음');
        }
        const user = await User.findOne({ where: { id } });
        if (!user) {
            throw new Error('사용자를 찾을 수 없습니다.');
        }

        const passwdMatch = await bcrypt.compare(passwd, user.passwd);

        if (!passwdMatch) {
            throw new Error('비밀번호가 일치하지 않습니다.');
        }

        console.log('로그인 성공');
        return user;
        
    } catch (error) {
        console.error('로그인 에러', error);
        throw error;
    }
}

//회원탈퇴 함수
async function deleteId(id) {
    try{
     console.log("deleteID 컨트롤러 불림");
     //console.log(id);
      const user = await User.findOne({ where: { id } });
      if (!user) {
        throw new Error('User not found');
      }
      else {console.log("유저는 있음");}
      await user.destroy({
        truncate:true,
      });
      console.log("회원삭제 완료");
    } catch (error) {
      console.error('Error deleting user', error);
      throw error;
    }
  }

module.exports = {
    signup, login, deleteId
};