const mongoose = require('mongoose');

const con = mongoose.connect('mongodb://127.0.0.1:27017/Sample');

con.then(() => {
    console.log('Database Connected Successfully');
})
.catch(() => {
    console.log('Connection Failed');
});

const U_schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

const U_model = mongoose.model('User', U_schema);

module.exports = U_model;
