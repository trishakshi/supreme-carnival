require('dotenv').config()
const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const roles = require('../models/roles')
const {userAuth, roleAuth} = require('../middleware/Auth')

// getting all users
// try{}
//     catch (err) {
//         return res.status(500).send()
//     }

// get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    }
    catch (err) {
        return res.status(500).send()
    }
})

// getting tokens
router.get('/getTokens', async (req, res) => {
    try {
        const tokens = res.send(req.cookies)
        res.json(tokens)
    }
    catch (err) {
        return res.status(500).send()
    }
})

// geting logged user
router.get('/loggedUser', userAuth, async (req, res) => {
    try {
        const user = await User.findById({_id: req.user}).select(['-passwordHash', '-updatedAt', '-__v'])
        res.json(user)
    }
    catch (err) {
        return res.status(500).send()
    }
})

// registering user
router.post('/register', async (req, res) => {
    try {
        const { name, phoneNumber, password, email } = req.body

        if (!name || !phoneNumber || !password) {
            return res.status(400).json({ err: "All fields are required." })
        }

        if (password.length < 6) {
            return res.status(400).json({ err: "Password must be six characters long." })
        }

        const existingUser = await User.findOne({ phoneNumber })
        if (existingUser) {
            return res.status(400).json({ err: "Account already exists." })
        }

        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)

        const newUser = new User({
            name,
            phoneNumber,
            email,
            status: 'pending',
            passwordHash,
            roleId: roles.admin
        })

        const savedUser = await newUser.save()

        const token = jwt.sign({registeredToken:{ id: savedUser._id, roleId: savedUser.roleId }}, process.env.JWT_SECRET)

        res.cookie("token", token, { httpOnly: true }).send()
    }
    catch (err) {
        return res.status(500).send()
    }
})

// loging user
router.post('/login', async (req, res) => {
    try {
        const { password, email } = req.body

        if (!email || !password) {
            return res.status(400).json({ err: "All fields are required." })
        }
        const phoneNumber = /[@]/gi.test(email) ? "" : email;

        const existingUser = await User.findOne({
            $or: [
                { email }, { "phoneNumber": phoneNumber }
            ]
        })
        if (!existingUser) {
            return res.status(400).json({ err: "Account doesn't exists. Please register first." })
        }

        const correctPassword = await bcrypt.compare(password, existingUser.passwordHash)
        if (!correctPassword) {
            return res.status(400).json({ err: "Incorrect username or password." })
        }

        const token = jwt.sign({registeredToken:{ id: existingUser._id, roleId: existingUser.roleId }}, process.env.JWT_SECRET)

        res.cookie("token", token, { httpOnly: true }).send()
    }
    catch (err) {
        return res.status(500).send()
    }
})

// updating user status
router.put("/users/:id", roleAuth, async (req, res) => {
    try {
        const id = req.params.id
        const existingUser = await User.findById({ _id: id })

        if(req.role === roles.admin){
            const { status } = req.body

            if (!status) {
                return res.status(400).json({ err: "Status should not be empty." })
            }
    
            if (existingUser.status === status) {
                return res.status(400).json({ err: "Status already updated." })
            }
    
            existingUser.status = status
    
            const updatedUser = await existingUser.save();
    
            res.json(updatedUser)
        }else{
            return res.status(401).json({err: "Unauthorized"})
        }
        
    }
    catch (err) {
        return res.status(500).send()
    }
})

module.exports = router