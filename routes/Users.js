const express = require('express')
const path = require('path')
const bcrypt = require('bcrypt')

const U_model = require('../models/user')

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const viewsPath = path.join(__dirname, '..', 'views');


router.use(express.static(viewsPath))

router.get('/', (req, res) => {
    res.sendFile(path.join(viewsPath, 'Userlogin.html'))
})

router.post('/login', async (req, res) => {
    const data = {
        name: req.body.Username,
        password: req.body.Password
    }

    try {
        const user = await U_model.findOne({ name: req.body.Username});


        if (!user) {
            res.send('User Not Found');
        }

        const Match = await bcrypt.compare(req.body.Password,user.password);

        if(Match)
        {
            res.send('User Logged in Succesfully')
            console.log()
        }
        else{
            res.send('Wrong Password')
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});



router.get('/signup', (req, res) => {
    res.sendFile(path.join(viewsPath, 'Usersignup.html'))
})
router.post('/signup', async (req, res) => {
    const data = {
        name: req.body.Username,
        password: req.body.Password
    };
    try {
        const ext = await U_model.findOne({ name: data.name });
        if (ext) {
            res.send("Username already Exists, Pls choose Another name!")
        }
        else {

            const rounds = 10;
            const hash = await bcrypt.hash(data.password, rounds);

            data.password = hash;
            const newUser = await U_model.create(data);
            console.log(newUser);
            res.send('User registered successfully');
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
module.exports = router;