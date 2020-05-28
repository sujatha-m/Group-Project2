// Requiring bcrypt for password hashing
const bcrypt = require('bcryptjs')

module.exports = function (sequelize, DataTypes) {
  // Creating our User model
  const User = sequelize.define('User', {
    // The username cannot be null
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1, 20] }
    },

    // The email cannot be null, and must be a proper email before creation
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
  // if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
  }
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.addHook('beforeCreate', function (user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null)
  })
  // Associate the User model to the report model in a `hasMany` relationship
  // When an User is deleted, also delete any associated Report
  User.associate = function (models) {
    User.hasMany(models.Report, { onDelete: 'cascade' })
  }

  return User
}
