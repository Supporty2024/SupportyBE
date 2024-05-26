"use strict";

const express = require("express"),
  app = express(),
  router = express.Router(),
  session = require("express-session"),

  methodOverride = require("method-override");

const { testDatabaseConnection } = require('./utils/database');
testDatabaseConnection();

app.set("port", process.env.PORT || 80);

app.use("/",router)

// 세션 설정
app.use(session({
  secret: 'W23@9aP#6GnRq$8sL5Tz',
  resave: false,
  saveUninitialized: true
}));

const drugscontroller = require("./controllers/drugscontroller");

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


// app.get("/", (req,res)=> {
//   res.send("복용약 page home");
// });
// router.get("/drugs",drugscontroller.showTodayDrugList);
// router.get("/drugs/entire", drugscontroller.showEntireDrugList);
// router.get("/drugs/record",drugscontroller.showTodayDrugRecord);
// router.get("/drugs/entire/record",drugscontroller.showDrugRecord);
// router.get("/drugs/info",drugscontroller.showDrugInfo);

// // 목표
// const errorHandler = require('./middlewares/errorMiddleware');
// const bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// const goalRoute = require('./routes/goalRoute');
// app.use('/goal', goalRoute);

//app.use(errorHandler);

module.exports = router;


app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});