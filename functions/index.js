const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
const categories = require("./categories");
const budgets = require("./budget");
exports.calcTotals = categories.calcTotals;
exports.transactionDelete = categories.transactionDelete;
exports.transactionUpdate = categories.transactionUpdate;
exports.categoryAdd = budgets.categoryAdd;
exports.categoryDelete = budgets.categoryDelete;
exports.budgetCreate = budgets.budgetCreate;
