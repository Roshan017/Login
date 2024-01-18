const express = require('express')
const path = require('path')

const User = require('./routes/Users')
const Admin = require('./routes/Admin')

const Port = 3000;

const app = express();
app.use(express.static(path.join(__dirname,'views')));

app.use('/admin',Admin)
app.use('/user',User)
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'views','Wel.html'));
})



app.listen(Port, ()=>{
    console.log(`Server is live on Port ${Port}`)
})