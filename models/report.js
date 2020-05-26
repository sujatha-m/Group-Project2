module.exports = function (sequelize, DataTypes) {
  // Give the Author model a name of type STRING
  const Report = sequelize.define('Report', {

    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1, 15] }

    },
    cityName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1, 15] }
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1, 200] }
    }

  })
  Report.associate = function (models) {
    Report.belongsTo(models.User, {
      foreignKey: { allowNull: false }
    })
  }

  return Report
}
