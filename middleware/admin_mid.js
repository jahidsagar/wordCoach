require('dotenv').config();
const jwt = require('jsonwebtoken');

//taking input
const email = process.env.EMAIL;
const password = process.env.PASSWORD;

exports.login_middleware = (req, res, next) => {
    //generating token
    const token = jwt.sign({ email: email }, 'secret', { expiresIn: '4h' });
    // const checktoken = jwt.verify(token,'secret');
    if (req.body.email === email && req.body.password === password) {
        res.cookie('auth', token,
            {
                signed: true,
                httpOnly: true,
                sameSite: true,
                maxAge: 4 * 60 * 60 * 1000
            });
        res.redirect('/login');
        next();
    }
    next();
}