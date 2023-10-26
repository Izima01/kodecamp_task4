const express = require('express');
require('dotenv').config();
const router = express.Router();
const userCollection = require('../schema/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    try {
        const { fullName, userName, password, role } = req.body;
        const salt = bcrypt.genSaltSync(5);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const isUserExist = await userCollection.findOne({ userName: userName });
        if (isUserExist) return res.status(400).send("Username unavailable");
        await userCollection.create({
            fullName, userName, password: hashedPassword, role
        });

        res.status(201).send("User created successfully");
    }
    catch (err) {
        console.log(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { userName, password } = req.body;
        const userDetails = await userCollection.findOne({ userName });

        if (!userDetails) return res.status(404).send("User not found");
        
        const { userName: foundUserName, password: userPassword, _id: userId, role } = userDetails;
        const isPasswordmatch = bcrypt.compareSync(password, userPassword);
        if (!isPasswordmatch) return res.status(400).send("Password incorrect");
        
        const token = jwt.sign({ userName: foundUserName, userId, role }, process.env.secret);
        res.status(200).json({ message: "Sign in successful", token });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;