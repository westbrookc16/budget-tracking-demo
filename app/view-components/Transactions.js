import React, { useState, useEffect } from "react";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import "firebase/firestore";
import { useFirebaseApp } from "reactfire";
import { useParams } from "react-router-dom";
import AddTransaction from "./AddTransaction";

const Transactions = () => {
  const { categoryID, budgetID } = useParams();
  //get category to display in title
  const [category, setCategory] = useState({});
  useEffect(() => {
    async function getCategory() {
      const catDoc = await firebase
        .firestore()
        .collection("categories")
        .doc(categoryID)
        .get();
      setCategory({ id: catDoc.id, ...catDoc.data() });
      document.title = `Transactions for ${catDoc.data().name}`;
    }
    getCategory();
  }, [firebase, categoryID]);
  const firebase = useFirebaseApp();
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const transCollection = firebase
      .firestore()
      .collection("transactions")
      .where("category.id", "==", categoryID);
    return transCollection.onSnapshot(snapShot => {
      setTransactions(
        snapShot.docs.map(doc => {
          return { id: doc.id, ...doc.data(), date: doc.data().date.toDate() };
        })
      );
    });
  }, [firebase, categoryID]);
  return (
    <div>
      <h1>Transactions</h1>
      <Grid data={transactions}>
        <Column field="name" title="name" />
        <Column field="date" title="date" format="{0:d}" />
        <Column title="Amount" field="amount" format="{0:c2}" />
      </Grid>
      <AddTransaction defaultCategory={category} budgetID={budgetID} />
    </div>
  );
};
export default Transactions;
