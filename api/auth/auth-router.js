const express = require('express')
const bcrypt = require('bcryptjs')

const router = express.Router()
const Middle = require('./auth-middleware')
const User = require('../users/users-model')


router.post('/register', Middle.protect, async (req, res) => {
	const { username, password } = req.body
	const hash = bcrypt.hashSync(password, 10)
	const newUser = {
		username, 
		password: hash
	}
	const result = await User.add(newUser)
	res.status(201).json({ message: `nice to have you, ${result.username}` });
})

router.post('/login', (req, res) => {
	res.json({message: 'login working'})
});

router.get('/logout', (req, res) => {
	res.json({message: 'logout working'})
})




module.exports = router