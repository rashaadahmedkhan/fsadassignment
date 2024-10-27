const express = require('express')
const router = express.Router()
const User = require('../models/User')

// auth

// signup get
router.get('/api/auth/signup', (req,res) => {
    try {
        res.status(200).json(res)
    } catch(error) {
        res.status(500).json({message: error.message})
    }
})

// signup post
router.post('/api/auth/signup', async(req,res) => {
    const {email, password} = req.body
    try {
        console.log('signup request', req.body)
        const user = await User.create({email, password})
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(201).json({ message: 'user created successfully!', user});
    } catch(error) {
        console.log(error.message)
        res.status(400).json({message: error.message})
    }
})

// login get
router.get('/api/auth/login', (req,res) => {
    try {
        res.status(200).json(res.body)
    } catch(error) {
        res.sendStatus(500).json({message: error.message}).lean()
    }
})

// login post
router.post('/api/auth/login', (req,res) => {
    try {
        const {email, password} = req.body
        console.log(email, password)
        res.status(200).json({ message: 'Login successful', email });
    } catch(error) {
        res.sendStatus(500).json({message: error.message}).lean()
    }
})

module.exports = router