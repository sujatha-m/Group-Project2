module.exports = function (sequelize, DataTypes) {
  // Give the Report model
  const Report = sequelize.define('Report', {
    // The phoneNumber cannot be null
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1, 15] }

    },
    // The cityName cannot be null
    cityName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1, 15] }
    },
    // The message cannot be null
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1, 200] }
    }

  })
  // Associate the Report model to the User model in a `belongsTo` relationship
  Report.associate = function (models) {
    Report.belongsTo(models.User, {
      foreignKey: { allowNull: false }
    })
  }

  return Report
}
