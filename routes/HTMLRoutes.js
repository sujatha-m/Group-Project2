const express = require('express')
const path = require('path')

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require('../config/middleware/isAuthenticated')

const PUBLIC_FOLDER_PATH = path.join(process.cwd(), 'public')

const router = express.Router()

router.get('/', (req, res) => {
  res.sendFile(path.join(PUBLIC_FOLDER_PATH, 'index.html'))
})

router.get('/login', (req, res) => {
  res.sendFile(path.join(PUBLIC_FOLDER_PATH, 'login.html'))
})

router.get('/register', (req, res) => {
  res.sendFile(path.join(PUBLIC_FOLDER_PATH, 'register.html'))
})

router.get('/report', isAuthenticated, (req, res) => {
  res.sendFile(path.join(PUBLIC_FOLDER_PATH, 'report.html'))
})
router.get('/view', (req, res) => {
  res.sendFile(path.join(PUBLIC_FOLDER_PATH, 'view.html'))
})

module.exports = router
