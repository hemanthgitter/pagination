const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const {getTotalCount, getHomePage} = require('./routes/index');
const {postLogin} = require('./routes/login');

const port = 5000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'chad'
});

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('Connected to the database chad');
});

global.db = db;

app.set('port', process.env.port || port);
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/app', getTotalCount);
app.post('/login', postLogin);
app.get('/projects', getHomePage);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})