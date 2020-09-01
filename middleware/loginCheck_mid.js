require('dotenv').config();
const jwt = require('jsonwebtoken');

const email = process.env.EMAIL;
//check user to login if not then go '/' page
exports.adminCheck_middleware = (req, res, next) => {
    const cookie_check = req.signedCookies['auth'];
    if (cookie_check) {
        const checktoken = jwt.verify(cookie_check, 'secret');
        // console.log(checktoken.email);
        if (checktoken.email === email) {
            res.redirect('/login');
        }
    }
    next();
}
//check user ability if not loged in and not 
//correct authentication then redirect to '/' page
exports.admin_middleware = (req, res, next) => {
    const cookie_check = req.signedCookies['auth'];
    if (cookie_check) {
        try {
            const checktoken = jwt.verify(cookie_check, 'secret');
            // console.log(checktoken.email);
            if (checktoken.email === email) {
                next();
            }
        } catch (error) {
            res.redirect('/');
        }

    }
    res.redirect('/');
}