const express = require('express');
const router = express.Router();
const User = require('../models/User');

const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = "mynamgoodAman"

// ROUTE 1: Create a User using: POST "/api/auth/createuser". NO Login reqired
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 6 charachters').isLength({ min: 6 })
], async (req, res) => {

    // for any errors return bad request and error
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() });
    }

    try {
        // check whether the user with same email already exists
        let usercheck = await User.findOne({ email: req.body.email })
        // console.log(usercheck)
        if (usercheck) {
            return res.status(400).json({ error: 'Email already exists' })
        }

        // Setting up bcrypt js for encrypting passwrod with hash - salt and pepper
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        let userdata = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })

        // Authtoken sending
        const data = {
            userdata: {
                id: userdata.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET)
        console.log(authtoken)

        res.send({ authtoken });

        // res.send(userdata);

        // .then(userdata => res.json(userdata))
        //     .catch(err => res.status(400).json({
        //         error: 'please enter a unique email address',
        //         message: err.errmsg
        //     }))

    } catch (error) {
        console.log(error.message);
        res.status(500).send({error: 'internal server error during creating User'});
    }
})

// ROUTE 2: Authenticate a User using: POST "/api/auth/login".
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can not be empty!').exists()
], async (req, res) => {

    // for any errors return bad request and error
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() });
    }

    const { email, password } = req.body;
    try {
        // User checking
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).send({error: "Please enter correct info."});
        }

        // Password checking
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).send({error: "Please enter correct info."});
        }

        // Authtoken sending
        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET)
        console.log(authtoken)

        res.send({ authtoken });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({error: 'internal server error during login'});
    }
})

// ROUTE 3: get user detail using: POST "/api/auth/getuser". Login reqired
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).send({error: 'internal server error during login'});
    }
})

module.exports = router