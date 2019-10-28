import React, { useState, useEffect } from "react";
import { Button } from "@progress/kendo-react-buttons";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import "firebase/firestore";
import { useFirebaseApp } from "reactfire";
import { useParams } from "react-router-dom";
import AddTransaction from "./AddTransaction";
import { formatMoney } from "../utils/numbers";

const Transactions = () => {
  const { categoryID, budgetID } = useParams();
  //get category to display in title
  const [category, setCategory] = useState({});
  useEffect(() => {
    async function getCategory() {
      return await firebase
        .firestore()
        .collection("categories")
        .doc(categoryID)
        .onSnapshot(catDoc => {
          setCategory({ id: catDoc.id, ...catDoc.data() });
          document.title = `Transactions for ${catDoc.data().name}`;
        });
    }
    getCategory();
  }, [firebase, categoryID]);
  const deleteTransaction = async cat => {
    try {
      if (confirm(`Are you sure you want to delete ${cat.name}?`))
        await firebase
          .firestore()
          .collection("transactions")
          .doc(cat.id)
          .delete();
    } catch (e) {
      console.table(e);
    }
  };
  const firebase = useFirebaseApp();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const transCollection = firebase
      .firestore()
      .collection("transactions")
      .where("category.id", "==", categoryID);
    return transCollection.onSnapshot(snapShot => {
      //calculate totals

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
        <Column
          title="Delete"
          cell={p => {
            const { dataItem } = p;
            return (
              <td>
                <Button
                  primary={true}
                  onClick={e => {
                    e.preventDefault();
                    deleteTransaction(dataItem);
                  }}
                >
                  Delete
                </Button>
              </td>
            );
          }}
        ></Column>
      </Grid>
      <AddTransaction defaultCategory={category} budgetID={budgetID} />
      <h1>Status</h1>
      <ul>
        <li>Total Budgeted: {formatMoney(category.amount)}</li>
        <li>Total Spent: {formatMoney(category.totalSpent)}</li>
      </ul>
    </div>
  );
};
export default Transactions;
