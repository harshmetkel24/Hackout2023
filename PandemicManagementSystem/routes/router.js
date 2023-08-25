const express = require('express');
const route = express.Router();

const services = require('../services/render')
const controller = require('../controller/controller');
const verify = require('../controller/verifytoken');


route.get('/', services.homeRoutes);

route.post('/login', controller.login);

route.post('/addUser', controller.addUser);

route.get('/hostpitalAllocation', verify, controller.hostpitalAllocation);

module.exports = route