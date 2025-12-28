const sequelize = require('../db');
const User = require('./userModule');
const Task = require('./taskModule');

// Define relationships
// A User has many Tasks
User.hasMany(Task, {
    foreignKey: 'userId',
    as: 'tasks'
});

// A Task belongs to a User
Task.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});

module.exports = {
    sequelize,
    User,
    Task
};
