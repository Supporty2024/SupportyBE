"use strict";

const express = require('express')
const router = express.Router()
const drugsController = require("../controllers/drugsController")
const methodOverride = require("method-override")

router.use(
    methodOverride("_method", {
        methods: ["POST", "GET"]
    })
    );
    
    router.use(
    express.urlencoded({
        extended: false
    })
    );
    router.use(express.json());
      

router.get("/", (req,res)=> {
    res.send("복용약 page home");
  });
  router.get("/today",drugsController.showTodayDrugList);
  router.get("/entire", drugsController.showEntireDrugList);
  router.get("/today/record",drugsController.showTodayDrugRecord);
  router.get("/entire/record",drugsController.showDrugRecord);
  router.get("/info",drugsController.showDrugInfo);

  module.exports = router;
  