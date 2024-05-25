const express = require('express')

const router = express.Router()


router.post('/register', (req, res) => {
	res.json({message: 'register working'})
})

router.post('/login', (req, res) => {
	res.json({message: 'login working'})
});

router.get('/logout', (req, res) => {
	res.json({message: 'logout working'})
})




module.exports = router