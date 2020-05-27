const express = require('express')
const db = require('../models')
const passport = require('../config/passport')

const router = express.Router()

var currentUserId

// Sign-on Routes
// Login
router.post('/api/login', passport.authenticate('local'), (req, res) => {
  res.json(req.user)
})

// // Register
// router.post('/api/register', async (req, res) => {
//   const { username, email, password } = req.body

//   try {
//     const user = await db.User.create({
//       username,
//       email,
//       password
//     })

//     res.status(200).json(user)
//   } catch (error) {
//     res.status(404).json(error)
//   }
// })

router.post('/api/register', async (req, res) => {
  try {
    db.User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
      .then(function () {
        res.redirect(307, '/api/login')
      })
  } catch (error) {
    res.status(401).json(error)
  }
})

router.post('/api/report', async (req, res) => {
  console.log(req.body)
  req.body.UserId = req.user.id
  const data = {
    phoneNumber: req.body.phoneNumber,
    cityName: req.body.cityName,
    message: req.body.message,
    UserId: req.user.id
  }
  try {
    const report = await db.Report.create(data)
    res.status(200).json(report)
  } catch (error) {
    res.status(404).json(error)
  }
})

// GET route for getting all of the reorts
router.get('/api/view', function (req, res) {
  // The `.findAll()` method is inherited from the Sequelize.Model class
  // and returns the results of a "SELECT * FROM Reports" command.
  // findAllRows()
  console.log(req.user)
  db.Report.findAll()
    .then(rows => res.status(200).json({ data: rows }))
    .catch(err => res.status(500).json({ errors: [err] }))
})

router.get('/api/viewmine', function (req, res) {
  // The `.findAll()` method is inherited from the Sequelize.Model class
  // and returns the results of a "SELECT * FROM Todos" command.
  // findAllRows()
  db.Report.findAll({
    where: {
      UserId: currentUserId
    }
  })
    .then(rows => res.status(200).json({ data: rows }))
    .catch(err => res.status(500).json({ errors: [err] }))
})

// DELETE route for deleting reports.
// We can access the primary key for the Report to be deleted at `req.params.id`
// router.delete('/:id', async function (req, res) {
router.delete('/api/viewmine/:id', async function (req, res) {
  try {
    // const recordCount = await Todo.destroy({where: {id: req.params.id}})
    // Retrieve the row to be deleted so that we can return it to the client
    let targetReport = await db.Report.findByPk(req.params.id)
    // Use the `.destroy()` method inherited from the Sequelize.Model class
    // @see https://sequelize.org/v5/class/lib/model.js~Model.html#static-method-destroy
    targetReport = await targetReport.destroy()
    // return the successfully removed report to the client
    res.status(200).json({ data: targetReport })
  } catch (err) {
    console.log(err)
    res.status(500).json({ errors: [err] })
  }
})

module.exports = router
