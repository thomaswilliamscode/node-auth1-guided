const express = require('express')
const bcrypt = require('bcryptjs')

const router = express.Router()
const Middle = require('./auth-middleware')
const User = require('../users/users-model')


router.post('/register', async (req, res) => {
	const { username, password } = req.body
	const hash = bcrypt.hashSync(password, 10)
	const newUser = {
		username, 
		password: hash
	}
	const result = await User.add(newUser)
	res.status(201).json({ message: `nice to have you, ${result.username}` });
})

router.post('/login', async (req, res, next) => {
	const { username, password } = req.body
	const [user] = await User.findBy({username: username})
	if (user && bcrypt.compareSync(password, user.password)) {
		req.session.user = user
		res.json({message: `Welcome back. ${user.username}`})
	} else {
		next({status: 401, message: 'bad credentials'})
	}
});

router.get('/logout', (req, res) => {
	if (req.session.user) {
		const { username } = req.session.user
		req.session.destroy( err => {
			if (err) {
				res.json({message: `you can never leave, ${username}`})
			} else {
				res.json({message: `Goodbye, ${username}`})
			}
		})
	} else {
		res.json({message: 'sorry, have we met?'})
	}
})




module.exports = router