const express = require('express')
const path = require('path')

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

router.get('/complaint', (req, res) => {
  res.sendFile(path.join(PUBLIC_FOLDER_PATH, 'complaint.html'))
})

module.exports = router
