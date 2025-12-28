const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('tasks', 'user1', '12345', {
  host: 'localhost',
  dialect: 'mssql' 
});



module.exports = sequelize;