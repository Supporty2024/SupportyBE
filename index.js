"use strict";

const express = require("express"),
  app = express(),
  session = require("express-session"),
  router = express.Router(),
  methodOverride = require("method-override");

const { testDatabaseConnection } = require('./utils/database');
testDatabaseConnection();

app.set("port", process.env.PORT || 80);

// 세션 설정
app.use(session({
  secret: 'W23@9aP#6GnRq$8sL5Tz',
  resave: false,
  saveUninitialized: true
}));


// 회원가입 라우터
const userRoute = require("./routes/userRoute");

app.use("/user", userRoute);


router.use(
  methodOverride("_method", {
    methods: ["POST", "GET", "PATCH", "DELETE"]
  })
);

router.use(
  express.urlencoded({
    extended: false
  })
);
router.use(express.json());

// 목표 라우터
const goalRoute = require('./routes/goalRoute');
app.use("/goal", goalRoute);


module.exports = router;


app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});