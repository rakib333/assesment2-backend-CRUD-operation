const userModel = require("../models/userModel");
const jwt = require('jsonwebtoken');

// create user
exports.userRegistration = (req, res) => {
    const reqBody = req.body;
    userModel.create(reqBody, (err, data) => {
        if (err) {
            res.status(401).json({ status: 'failed to create user', data: err })
        }
        else {
            res.status(200).json({ status: 'user created', data: data })
        }
    })
};


// user login
exports.userLogin = (req, res) => {
    const reqBody = req.body;
    const email = reqBody['email'];
    const password = reqBody['password'];

    userModel.find({ email: email, password: password }, (err, data) => {
        if (err) {
            res.status(401).json({status: 'failed to load', data: err})
        }
        else {
            
            if(data.length> 0){

                // create token when user login
                const payLoad = {
                    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
                    data: data[0]
                };
                const token = jwt.sign(payLoad, 'thisCodeIsSecret12345');

                res.status(200).json({status: 'logged in',token,  data: data[0]})

            }else{
                res.status(400).json({status: 'unauthorized'})
            }
        }
    })

}


// select existing user

exports.selectUser = (req, res) => {
    const email = req.headers['email'];
    userModel.find({ email: email }, (err, data) => {
        if (err) {
            res.status(401).json({ status: 'failed to select user', data: err })
        }
        else {
            res.status(200).json({status: 'success', data: data})
        }
    })
}