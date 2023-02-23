const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    const token = req.headers['token-key'];
    jwt.verify(token, 'thisCodeIsSecret12345', (err, decoded) => {
        if (err) {
            res.status(400).json({status: 'unauthorized'})
        }
        else {
            let email = decoded['data']['email'];
            req.headers.email = email;
            let name = decoded['data']['name'];
            req.headers.name = name;
            next();
        }
    })
}