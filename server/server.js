require('./config/config');
const express = require('express')
const mongoose = require('mongoose');
const app = express()
const bodyParser = require('body-parser')
const colors = require('colors');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Coonfiguración global de rutas
app.use(require('./routes/index'));

mongoose.connect(process.env.URLDB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
},
    (err, res) => {
        if (err) {
            throw err;
        } else {
            console.log('Base de datos', 'ONLINE'.yellow);
        }
    });

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', colors.yellow(process.env.PORT))
})