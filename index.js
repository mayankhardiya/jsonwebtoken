var mongoose = require('mongoose');
const express = require('express');
var bodyParser = require('body-parser');
const app = express();

const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');

mongoose.connect('mongodb://localhost:27017/jwt', { useNewUrlParser: true }, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded')
    }
    else {
        console.log("Error In Db connection :" + err)
    }
});

app.use(express.json());

app.use('/api/user', authRoute);
app.use('/api/post', postRoute);

app.listen(3000, () => console.log('Server stater'));