"use strict";

const express = require("express"),
  app = express(),
  router = express.Router(),
  methodOverride = require("method-override");

const { testDatabaseConnection } = require('./utils/database');
testDatabaseConnection();

router.use(express.json());
app.use(express.json());

router.use(
  express.urlencoded({
    extended: false
  })
);

router.use(
  methodOverride("_method", {
    methods: ["POST", "GET", "PATCH", "DELETE"]
  })
);


// 세션 설정
app.use(session({
  secret: 'W23@9aP#6GnRq$8sL5Tz',
  resave: false,
  saveUninitialized: true
}));


app.set("port", process.env.PORT || 80);

// 회원가입 라우터
const userRoute = require("./routes/userRoute");
app.use("/user", userRoute);

// 다이어리 라우터
const diaryRoute = require("./routes/diaryRoute");
app.use("/diary", diaryRoute);

// 목표 라우터
const goalRoute = require('./routes/goalRoute');
app.use("/goal", goalRoute);

// 진료 라우터
const treatmentRoute = require('./routes/treatmentRoute');
app.use("/treatment", treatmentRoute);


module.exports = router;


app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});