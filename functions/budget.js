const functions = require("firebase-functions");
const admin = require("firebase-admin");
const db = admin.firestore();
exports.budgetCreate = functions.firestore
  .document("/budgets/{id}")
  .onCreate(snap => {
    //initialize total budgeted value to 0
    return snap.ref.update({ totalBudgeted: 0 });
  });
exports.categoryAdd = functions.firestore
  .document("/categories/{id}")
  .onCreate(async snap => {
    const { budgetID, amount } = snap.data();

    const budgetSnap = await db
      .collection("budgets")
      .doc(budgetID)
      .get();

    const { totalBudgeted } = budgetSnap.data();
    return budgetSnap.ref.update({ totalBudgeted: totalBudgeted + amount });
  });
exports.categoryDelete = functions.firestore
  .document("/categories/{id}")
  .onDelete(async snap => {
    const { budgetID, amount } = snap.data();
    const budgetSnap = await db
      .collection("budgets")
      .doc(budgetID)
      .get();
    const { totalBudgeted } = budgetSnap.data();
    budgetSnap.ref.update({ totalBudgeted: totalBudgeted - amount });
  });
