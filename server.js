// // ****************************************************************************
// // Server.js
// // This file is the initial starting point for the Node/Express server.
// // ****************************************************************************

// // Dependencies
// // =============================================================
// const express = require('express')
// const exphbs = require('express-handlebars')

// // Requiring our models for syncing to the MySQL database
// // Remember: This syntax imports the `db` object exported from the
// // `./models/index.js` module.
// const db = require('./models')

// // Sets up the Express App
// // =============================================================
// const app = express()

// // Set up the Express app to use the Handlebars template engine
// app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
// app.set('view engine', 'handlebars')

// // Sets up the Express app to handle data parsing
// app.use(express.urlencoded({ extended: true }))
// app.use(express.json())

// // Allow Express to automatically serve static resource like the
// // HTML, CSS and JavaScript for the frontend client application.
// app.use(express.static('./public'))

// // Routes
// // =============================================================
// app.get('/', (req, res) => {
//   res.render('index', { appName: 'Project 2 - Spam Tracker' })
// })

// // Syncing our sequelize models and then starting our express app
// db.sequelize.sync({ force: true }).then(() => {
//   const PORT = process.env.PORT || 3000
//   app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`))
// })

// Requiring necessary npm packages
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
// Requiring passport as we've configured it
const passport = require('./config/passport')

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 3000
const db = require('./models')

// Creating express app and configuring middleware needed for authentication
const app = express()

// Set up the Express app to use the Handlebars template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// app.use(express.static('public'))

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())

// Requiring our routes
require('./routes/html-routes.js')(app)
require('./routes/api-routes.js')(app)

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log('==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.', PORT, PORT)
  })
})
