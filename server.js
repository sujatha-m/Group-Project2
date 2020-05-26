// // ****************************************************************************
// // Server.js
// // This file is the initial starting point for the Node/Express server.
// // ****************************************************************************

// Dependencies
// =============================================================

// Requiring necessary npm packages
const express = require('express')
const path = require('path')
const session = require('express-session')
const exphbs = require('express-handlebars')
const logger = require('morgan')
// Requiring passport as we've configured it
const passport = require('./config/passport')
const HTMLRoutes = require('./routes/HTMLRoutes')
const APIRoutes = require('./routes/APIRoutes')

// Setting up requiring models for syncing
const db = require('./models')

// Creating express app and configuring middleware needed for authentication
const app = express()
// Log requests to the console.
app.use(logger('dev'))

// Set up the Express app to use the Handlebars template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// app.use(express.static('public'))
// Allow Express to automatically serve static resource like the
// HTML, CSS and JavaScript for the frontend client application.
app.use(express.static(path.join(__dirname, 'assets')))

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())

// // Routes
// // =============================================================
app.use(HTMLRoutes)
app.use(APIRoutes)

// Syncing our sequelize models and then starting our express app
db.sequelize.sync({ force: false, alter: true }).then(() => {
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`))
})
