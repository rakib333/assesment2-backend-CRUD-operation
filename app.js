// Basic library inport

const express = require('express');
const bodyParser = require('body-parser');
const router = require('./src/routes/api')
const app = new express();


// Security middleware library import

const cors = require('cors');
const hpp = require('hpp');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

// mongoBD library import
const mongoose = require('mongoose');

// security implementation
app.use(cors())
app.use(hpp())
app.use(helmet())
app.use(rateLimit())
app.use(mongoSanitize())
app.use(xss())


// bodyParser implement
app.use(bodyParser.json())


// set limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 2000
});
app.use(limiter);


// mongoDB connection string

const URI = 'mongodb+srv://<username>:<password>@taskmanager.w7fccry.mongodb.net/asessment?retryWrites=true&w=majority';
const OPTIONS = {user: 'asessment_assignment', pass: '01830446750'};
mongoose.set('strictQuery', false);
mongoose.connect(URI, OPTIONS, (err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('MongoDB is connected')
    }
});

//setup routing
app.use('/api/v1', router);


// undefined route implement
app.use('*', (req, res)=>{
    res.status(404).json({status: "Page not found", data: 'Not found anything'})
});


module.exports = app;



