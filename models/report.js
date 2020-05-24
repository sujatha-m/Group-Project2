module.exports = function (sequelize, DataTypes) {
  // Give the Author model a name of type STRING
  const Report = sequelize.define('Report', {

    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1, 15] }

    },
    types: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1, 15] }

    },

    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { len: [1, 50] }
    }
  })
  Report.associate = function (models) {
    Report.belongsTo(models.User, {
      foreignKey: { allowNull: false }
    })
  }

  return Report
}
