const functions = require("firebase-functions");

// The Firebase Admin SDK to access the Cloud Firestore.
const admin = require("firebase-admin");
admin.initializeApp();
// [END import]

const db = admin.firestore();

exports.categoryUpdate = functions.firestore
  .document("/transactions/{id}")
  .onCreate(async (snapshot, context) => {
    console.log("hi");
    const data = snapshot.data();
    const { amount } = data;
    const categoryID = data.category.id;

    const catDoc = await db
      .collection("categories")
      .doc(categoryID)
      .get();
    const catData = catDoc.data();
    catDoc.ref.update({ totalSpent: catData.totalSpent + parseFloat(amount) });
  });
exports.transDelete = functions.firestore
  .document("/transactions/{id}")
  .onDelete(async snapshot => {
    console.log("hey I'm here.");
    const data = snapshot.data();
    const catDoc = await db
      .collection("categories")
      .doc(data.category.id)
      .get();
    const catData = catDoc.data();
    const { amount } = data;
    catDoc.ref.update({ totalSpent: catData.totalSpent - amount });
  });
exports.calcTotals = functions.https.onCall(async () => {
  const catSnap = await db.collection("categories").get();
  const transSnap = await db
    .collection("transactions")
    //.where("category.id", "==", id)
    .get();
  catSnap.docs.forEach(catDoc => {
    const id = catDoc.id;

    //docs always seems no be undefined always. why?

    const totalSpent = transSnap.docs.reduce((total, trans) => {
      const data = trans.data();
      //if (!data.category) return total;
      if (data.category.id === id) return total + parseFloat(data.amount);
      else return total;
      //return total + (data.category.id === id) ? parseFloat(data.amount) : 0;
    }, 0);

    catDoc.ref.update({ totalSpent: totalSpent });
  });
  return {};
});
