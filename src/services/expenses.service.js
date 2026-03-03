const {
  models: { Expense },
} = require('../models/models');

const createExpense = async (data) => {
  return Expense.create(data);
};

const getExpenses = async () => {
  return Expense.findAll();
};

const getExpenseById = async (id) => {
  return Expense.findByPk(id);
};

const deleteExpenseById = async (id) => {
  const expense = await Expense.findByPk(id);

  if (!expense) {
    return null;
  }

  await expense.destroy();

  return expense;
};

const updateExpenseById = async (id, data) => {
  const expense = await Expense.findByPk(id);

  if (!expense) {
    return null;
  }

  await expense.update(data);

  return expense;
};

module.exports = {
  createExpense,
  getExpenses,
  getExpenseById,
  deleteExpenseById,
  updateExpenseById,
};
