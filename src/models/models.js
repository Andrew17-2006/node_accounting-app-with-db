const { sequelize } = require('../db');
const { User } = require('./User.model');
const { Expense } = require('./Expense.model');

User.hasMany(Expense, { foreignKey: 'userId' });
Expense.belongsTo(User, { foreignKey: 'userId' });

const models = {
  User,
  Expense,
};

module.exports = {
  sequelize,
  models,
};
