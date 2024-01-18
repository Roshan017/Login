const mongoose = require('mongoose')

const con = mongoose.connect('mongodb://127.0.0.1:27017/Sample')

con.then(()=>{
    console.log('Databse Connected Succesfully');

})
.catch(()=>{
    console.log('Connection Failed')
})

const A_schema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },

    password:{
        type: String,
        required:true
    },
});

const A_model = mongoose.model('Admin', A_schema);

module.exports = A_model;