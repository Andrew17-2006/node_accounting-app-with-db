const expenseService = require('../services/expenses.service');
const userService = require('../services/users.service');

exports.getExpenses = async (req, res) => {
  const { userId, categories, from, to } = req.query;

  let result = await expenseService.getExpenses();

  if (userId) {
    result = result.filter((e) => e.userId === Number(userId));
  }

  if (categories) {
    const list = Array.isArray(categories) ? categories : categories.split(',');

    result = result.filter((e) => list.includes(e.category));
  }

  if (from) {
    result = result.filter((e) => new Date(e.spentAt) >= new Date(from));
  }

  if (to) {
    result = result.filter((e) => new Date(e.spentAt) <= new Date(to));
  }

  res.json(result);
};

exports.createExpense = async (req, res) => {
  const { userId, amount, category, title, note, spentAt } = req.body;

  if (userId === undefined || amount === undefined || !title || !spentAt) {
    return res.status(400).json({ error: 'Bad request' });
  }

  const user = await userService.getUserById(Number(userId));

  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }

  const expense = await expenseService.createExpense({
    userId: Number(userId),
    amount: Number(amount),
    category,
    title,
    note,
    spentAt,
  });

  res.status(201).json(expense);
};

exports.getExpenseById = async (req, res) => {
  const id = req.params.id;

  const expense = await expenseService.getExpenseById(id);

  if (!expense) {
    return res.status(404).json({ error: 'Expense not found' });
  }

  res.json(expense);
};

exports.deleteExpenseById = async (req, res) => {
  const id = req.params.id;

  const deleted = await expenseService.deleteExpenseById(id);

  if (!deleted) {
    return res.status(404).json({ error: 'Not found' });
  }

  res.status(204).send();
};

exports.updateExpenseById = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  if (!data || !Object.keys(data).length) {
    return res.status(400).json({ error: 'Bad request' });
  }

  const updated = await expenseService.updateExpenseById(id, data);

  if (!updated) {
    return res.status(404).json({ error: 'Expense not found' });
  }

  res.json(updated);
};
