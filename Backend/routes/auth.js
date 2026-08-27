const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
// Create a user using: POST "/api/auth/createuser"
router.post(
    '/createuser',
    [
        body('email').isEmail(),
        body('password').isLength({ min: 5 }),
        body('name').isLength({ min: 3 })
    ],
    async (req, res) => {

        // Check for validation errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        try {
            const existingUser = await User.findOne({ email: req.body.email });
            if (existingUser) {
                return res.status(400).json({
                    error: 'Email already exists'
                });
            }

            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            const user = await User.create({
                name: req.body.name,
                password: secPass,
                email: req.body.email
            });

            const data = {
                user: {
                    id: user.id
                }
            };
            if (!process.env.JWT_SECRET) {
                return res.status(500).json({
                    error: 'Server configuration error: JWT_SECRET is missing'
                });
            }

            const token = jwt.sign(data, process.env.JWT_SECRET);
            return res.status(201).json({ authToken: token });
            console.log(process.env.JWT_SECRET);
        } catch (error) {
            console.log(error);

            // Duplicate email
            if (error.code === 11000) {
                return res.status(400).json({
                    error: 'Email already exists'
                });
            }

            return res.status(500).json({
                error: 'Internal Server Error'
            });
        }
    }
);
//to login a user
router.post(
    '/login',
    [body('email','enter email id').isEmail(),
    body('password','password cannot be blank').exists()],
    async (req, res) => {

            const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const {email,password} = req.body;
        try {
            let user = await User.findOne({email});
            if(!user){
                return res.status(400).json({error:"please try to login with correct credentials"});
            }
            const passwordCompare = await bcrypt.compare(password,user.password);
            if(!passwordCompare){
                return res.status(400).json({error:"please try to login with correct credentials"});
            }
            const data = {
                user:{
                    id:user.id
                }
            };
            if (!process.env.JWT_SECRET) {
                return res.status(500).json({
                    error: 'Server configuration error: JWT_SECRET is missing'
                });
            }

            const token = jwt.sign(data, process.env.JWT_SECRET);
            return res.status(200).json({ authToken: token });
        } catch (error) { 
            console.log(error);
            return res.status(500).json({
                error: 'Internal Server Error check details'
            });
        }
    }
);

//routers 3:get logged user details using: POST "/api/auth/getuser". login required

    router.post('/getuser',fetchuser,
    async (req, res) => {
        try{
    const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } 
catch (error) {
    console.log(error);
    return res.status(500).json({
        error: 'Internal Server Error'
    });}
}
    );
module.exports = router; 