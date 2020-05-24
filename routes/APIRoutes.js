const express = require('express')
const db = require('../models')
const passport = require('../config/passport')

const router = express.Router()

// Sign-on Routes
// Login
router.post('/api/login', passport.authenticate('local'), (req, res) => {
  res.json(req.user)
})

// Register
router.post('/api/register', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await db.User.create({
      email,
      password
    })

    res.status(200).json(user)
  } catch (error) {
    res.status(404).json(error)
  }
})

module.exports = router
