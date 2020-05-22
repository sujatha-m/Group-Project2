module.exports = function (sequelize, DataTypes) {
  // Give the Author model a name of type STRING
  const Complaint = sequelize.define('Complaint', {

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
  Complaint.associate = function (models) {
    Complaint.belongsTo(models.User, {
      foreignKey: { allowNull: false }
    })
  }

  return Complaint
}
