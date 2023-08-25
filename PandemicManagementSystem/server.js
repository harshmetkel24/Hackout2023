const express = require('express');
const dotenv = require('dotenv');
const bodyparser = require('body-parser');
// const connectDB = require('/server/database/connection');
const cors = require("cors");
const PMS = express();

dotenv.config({path:'dot.env'});
const PORT = process.env.PORT||8000;

// connectDB();
PMS.use(cors({
    origin: 'http://localhost:3000',
    credentials: true // some legacy browsers (IE11, various SmartTVs) choke on 204
}))

PMS.use(function(req, res, next) {
    res.header('Content-Type', 'application/json;charset=UTF-8')
    res.header('Access-Control-Allow-Credentials', true)
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
  })

PMS.use(express.json());
PMS.use(bodyparser.urlencoded({extended:true}));

PMS.use('/',require('./routes/router'));



PMS.listen(PORT,()=>{console.log(`Server is running on http://localhost:${PORT}`)});