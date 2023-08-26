const express = require("express");
const route = express.Router();

const controller = require("../controller/controller");

const resourseAllocation = require("../controller/resourseAllocation");

const verify = require("../controller/verifytoken");

const workforceController = require("../controller/workforceAllocation");

const labController = require("../controller/labAllocation");

const publicController = require("../controller/publicController");

route.post("/login", controller.login);

route.post("/add/user", controller.addUser);

route.post("/hostpitalAllocation", resourseAllocation.hostpitalAllocation);

// hospital related routes
route.post("/add/hospital", workforceController.createHosptal);

route.get("/get/hospitals", workforceController.getHospitals);

route.patch("/update/hospitals", workforceController.updateHospitals);

// lab related routes
route.post("/add/lab", labController.createLab);

route.put("/update/lab/:id", labController.updateLab);

route.get("/get/labs", labController.getAllLabs);

route.post("/labsAllocation", labController.labsAllocation);

route.post("/get/nearHospitals", publicController.nearHospitals);

module.exports = route;
