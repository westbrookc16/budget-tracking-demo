const functions = require("firebase-functions");

// The Firebase Admin SDK to access the Cloud Firestore.
const admin = require("firebase-admin");
admin.initializeApp();
// [END import]

const db = admin.firestore();

exports.categoryUpdate = functions.firestore
  .document("/transactions/{id}")
  .onWrite((snapshot, context) => {
    const data = snapshot.data();
    const { categoryID, amount } = data;
    return db
      .collection("categories")
      .doc(categoryID)
      .update({ totalSpent: totalSpent + amount });
  });
exports.calcTotals = functions.https.onCall(async () => {
  const catSnap = await db.collection("categories").get();
  const transSnap = await db
    .collection("transactions")
    //.where("category.id", "==", id)
    .get();
  catSnap.docs.forEach(catDoc => {
    const id = catDoc.id;
    console.log(`id=${id}`);

    //docs always seems no be undefined always. why?

    const totalSpent = transSnap.docs.reduce((total, trans) => {
      const data = trans.data();
      //if (!data.category) return total;
      if (data.category.id === id) return total + parseFloat(data.amount);
      else return total;
      //return total + (data.category.id === id) ? parseFloat(data.amount) : 0;
    }, 0);
    console.log(`totalSpent=${totalSpent}`);
    catDoc.ref.update({ totalSpent: totalSpent });
  });
  return {};
});
