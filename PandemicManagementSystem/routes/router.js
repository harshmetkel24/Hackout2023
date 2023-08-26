const express = require('express');
const route = express.Router();

const controller = require('../controller/controller');
const resourseAllocation = require('../controller/resourseAllocation');

const verify = require('../controller/verifytoken');


route.post('/login', controller.login);

route.post('/add/user', controller.addUser);

route.post('/hostpitalAllocation', resourseAllocation.hostpitalAllocation);


module.exports = route