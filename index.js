const express = require("express");
const app = express();
const port = 5000;

const mongoose_connect = require('mongoose');
const config = require('./config/key');

mongoose_connect.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log("MongoDB connect success")).catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(port, () => {
    console.log('Init app listen on port ' + port);
})