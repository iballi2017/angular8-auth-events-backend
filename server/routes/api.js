const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../models/user.js')

const mongoose = require('mongoose');



// db = 'mongodb+srv://fashion:Swordfish01@iballidb-nxfdz.mongodb.net/test?retryWrites=true'
db = 'mongodb+srv://fashion:' + process.env.MONGO_ATLAS_PW + '@iballidb-nxfdz.mongodb.net/test?retryWrites=true'
mongoose.connect(db, err => {
    if (err) {
        console.log('Error!' + err)
    } else {
        console.log('Connected to MongoDB!')
    }
}
    ,
    { useNewUrlParser: true }
);

// jwt verification
function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'mySecretKey')
    if (!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
}

router.get('/', (req, res) => {
    res.send('From API route');
})

router.post('/register', (req, res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((error, registeredUser) => {
        if (error) {
            console.log(error)
        } else {
            let payload = {
                subject: registeredUser._id
            }
            let token = jwt.sign(payload, 'mySecretKey')
            // res.status(200).send(registeredUser)
            res.status(200).send({ token })
            console.log(registeredUser)
        }
    })
})


router.post('/login', (req, res) => {
    let userData = req.body

    User.findOne(
        { email: userData.email }, (error, user) => {
            if (error) {
                console.log(error)
            } else {
                if (!user) {
                    res.status(401).send('Invalid email!')
                } else if (user.password !== userData.password) {
                    res.status(401).send('Invalid password!')
                } else {
                    let payload = {
                        subject: user._id
                    }
                    let token = jwt.sign(payload, 'mySecretKey')
                    // res.status(200).send(user)
                    res.status(200).send({ token })
                }
            }
        }
    )
})

// events api
router.get('/events', (req, res) => {
    let events = [
        {
            "id": "1",
            "name": "Auto Expo",
            "description": "Lorem Ipsum",
            "date": "2012-04-20T27:25:43:511Z"
        },
        {
            "id": "2",
            "name": "Ent Lotus",
            "description": "Ipsum Lorem",
            "date": "2012-04-23T18:45:43:511Z"
        },
        {
            "id": "3",
            "name": "Chemical Digress",
            "description": "Dpff Fyus",
            "date": "2012-04-13T05:05:43:511Z"
        },
        {
            "id": "4",
            "name": "Science Display",
            "description": "Jukry Latex",
            "date": "2012-04-10T16:00:43:511Z"
        },
        {
            "id": "5",
            "name": "Science Display",
            "description": "Jukry Latex",
            "date": "2012-04-10T16:00:43:511Z"
        },
        {
            "id": "6",
            "name": "Science Display",
            "description": "Jukry Latex",
            "date": "2012-04-10T16:00:43:511Z"
        },
        {
            "id": "7",
            "name": "Science Display",
            "description": "Jukry Latex",
            "date": "2012-04-10T16:00:43:511Z"
        },
        {
            "id": "8",
            "name": "Science Display",
            "description": "Jukry Latex",
            "date": "2012-04-10T16:00:43:511Z"
        },
        {
            "id": "9",
            "name": "Science Display",
            "description": "Jukry Latex",
            "date": "2012-04-10T16:00:43:511Z"
        },
        {
            "id": "10",
            "name": "Science Display",
            "description": "Jukry Latex",
            "date": "2012-04-10T16:00:43:511Z"
        }
    ]

    res.json(events)
})


// special events api

router.get('/special', verifyToken, (req, res) => {
    let events = [
        {
            "id": "1",
            "name": "Auto Expo",
            "description": "Lorem Ipsum",
            "date": "2012-04-20T27:25:43:511Z"
        },
        {
            "id": "2",
            "name": "Ent Lotus",
            "description": "Ipsum Lorem",
            "date": "2012-04-23T18:45:43:511Z"
        },
        {
            "id": "3",
            "name": "Chemical Digress",
            "description": "Dpff Fyus",
            "date": "2012-04-13T05:05:43:511Z"
        },
        {
            "id": "4",
            "name": "Science Display",
            "description": "Jukry Latex",
            "date": "2012-04-10T16:00:43:511Z"
        }
    ]

    res.json(events)
})



module.exports = router