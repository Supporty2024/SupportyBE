"use strict";

const express = require("express"),
  app = express(),
  router = express.Router(),
  methodOverride = require("method-override");

const { testDatabaseConnection } = require('./utils/database');
testDatabaseConnection();

app.set("port", process.env.PORT || 80);

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