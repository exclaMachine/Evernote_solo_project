'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    notebookId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    content: {
      allowNull: false,
      type: DataTypes.TEXT
    }
  }, {});
  Note.associate = function(models) {
    // associations can be defined here
    Note.belongsTo(models.User, { foreignKey: 'userId' });
    Note.belongsTo(models.Notebook, { foreignKey: 'notebookId' });
  };
  return Note;
};
