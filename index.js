// -------------  express js
const express = require('express');
let app = express();
const port = 3000;
// --------------  body parser for post req
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
// --------------   cookie parser
var cookieParser = require('cookie-parser')
app.use(cookieParser('rifat'));
// -------------   ejs engine
const ejs = require('ejs');
app.set('view engine', 'ejs');
// -------------  dotenv
require('dotenv').config(); //process.env.variable
// ---------------  Import the mongoose module
var mongoose = require('mongoose');

var mongoDB = 'mongodb://127.0.0.1/word_game';
mongoose
    .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('connected'); })
    .catch((err) => { console.log('error happened : ' + err); });

// calling mongoose model
let questionModel = require('./Schema/wordSchema');
// middleware
const admin_middleware = require('./middleware/admin_mid');
const loginCheck_middleware = require('./middleware/loginCheck_mid');
//controller
const questionController = require('./Controller/questionController');
//route
app.get('/', loginCheck_middleware.adminCheck_middleware, (req, res) => {
    res.render('index', { data: { title: 'ejs template engine', url: 'http://localhost:3000' } });
});
app.post('/', admin_middleware.login_middleware, (req, res) => {
    res.render('index', { data: { title: 'ejs template engine', url: 'http://localhost:3000' } });
});
app.get('/login', loginCheck_middleware.admin_middleware, (req, res) => {
    res.render('questionAdd');
});
app.get('/logout', (req, res) => {
    res.cookie('auth', null);
    res.redirect('/');
});

app.get('/questions/:jwt', questionController.get_all_question);
app.post('/questions/:jwt?', (req, res) => {
    console.log(req.body);
    // res.send(req.body);
    const data = new questionModel({
        question: req.body.question,
        option_a: req.body.option_a,
        op_a_desc: req.body.opAdesc,
        option_b: req.body.option_b,
        op_b_desc: req.body.opBdesc,
        level: req.body.level,
        ans: req.body.ans
    });
    data.save((err, data) => {
        try {
            console.log('success ' + data);
        } catch (error) {
            console.log('some errors happen ' + error);
        }
    });
    res.redirect('/login');
});
app.put('/question/:jwt/:id', (req, res) => {
    res.send("edit " + req.params.id);
});
app.delete('/question/:jwt/:id', (req, res) => {
    res.send("delete " + req.params.id);
});

//runing server
app.listen(port, () => {
    console.log(`Server started on port http://localhost:3000`);
});

//log in complete we should change logout as a post request
//make a view to add questions completed
//make a view to show all questions
//connect mongo db and save questions