const express = require('express')
const path = require('path')

const router = express.Router();
const viewsPath = path.join(__dirname, '..', 'views');
const A_model = require('../models/admin')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router.use(express.static(viewsPath))
router.get('/', (req,res)=>{
    res.sendFile(path.join(viewsPath,'Adminlogin.html'))
})

router.post('/login', async (req, res) => {
    const data = {
        name: req.body.Username,
        password: req.body.Password
    }

    try {
        const user = await A_model.findOne(data);

        if (user) {
            console.log('Admin logged in successfully');
            res.send('Admin logged in successfully');
        } else {
            console.log('Invalid credentials');
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});



module.exports = router;