const express = require('express')
const db = require('../models')

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require('../config/middleware/isAuthenticated')

// This is use to inject library into the HTML document head.
// I couldn't find a better way of doing this as Express render method doesn't make it easy to do.
//
// To inject library into a page, pass a object with the title, css array, and script array into Express render method option.
const lib = {
  global: 'style/global.css',
  bulma: 'vendor/bulma.min.css',
  fonts: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
  fontawesome: 'https://use.fontawesome.com/releases/v5.3.1/js/all.js',
  jquery: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js'
}

const router = express.Router()

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Spam Numbers Tracker',
    css: [
      lib.bulma,
      lib.global,
      lib.fonts,
      'style/home.css'
    ],
    script: [
      lib.fontawesome,
      'js/home.js'
    ]
  })
})

router.get('/login', (req, res) => {
  res.render('login', {
    title: 'Spam Numbers Tracker | Login',
    css: [
      lib.bulma,
      lib.global,
      lib.fonts,
      'style/signon.css'
    ],
    script: [
      lib.fontawesome,
      'js/signon.js'
    ]
  })
})

router.get('/register', (req, res) => {
  res.render('register', {
    title: 'Spam Numbers Tracker | Register',
    css: [
      lib.bulma,
      lib.global,
      lib.fonts,
      'style/signon.css'
    ],
    script: [
      lib.fontawesome,
      'js/signon.js'
    ]
  })
})

router.get('/report', isAuthenticated, async (req, res) => {
  try {
    const reports = await db.Report.findAll()

    res.render('report', {
      reports,
      title: 'Spam Numbers Tracker | Report',
      css: [
        lib.bulma,
        lib.global,
        lib.fonts,
        'style/report.css'
      ],
      script: [
        lib.fontawesome,
        'js/report.js'
      ]
    })
  } catch (error) {
    console.error(error)
  }
})

router.get('/view', (req, res) => {
  res.render('view', {
    title: 'Spam Numbers Tracker | All Spam Number',
    css: [
      lib.bulma,
      lib.global,
      lib.fonts,
      'style/report.css'
    ],
    script: [
      lib.fontawesome,
      lib.jquery,
      'js/view.js'
    ]
  })
})

module.exports = router
