'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notebook = sequelize.define('Notebook', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {});
  Notebook.associate = function(models) {
    // associations can be defined here
    Notebook.belongsTo(models.User, { foreignKey: 'userId' });
    Notebook.hasMany(models.Note, { foreignKey: 'notebookId' });
  };
  return Notebook;
};
