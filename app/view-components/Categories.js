import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { useFirebaseApp } from "reactfire";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { Button } from "@progress/kendo-react-buttons";
import { NumericTextBox, Input } from "@progress/kendo-react-inputs";
import "firebase/firestore";
import PropTypes from "prop-types";
const Categories = ({ budgetID }) => {
  const [categories, setCategories] = useState([]);
  const firebase = useFirebaseApp();
  //variables for new category addition
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    async function getCategories() {
      try {
        return await firebase
          .firestore()
          .collection("categories")
          .where("budgetID", "==", budgetID)
          .onSnapshot(catSnap => {
            let tempCats = [];
            catSnap.forEach(doc => {
              tempCats = [...tempCats, { id: doc.id, ...doc.data() }];
            });

            setCategories(tempCats);
          });
      } catch (e) {
        console.table(e);
      }
    }
    getCategories();
  }, [firebase, budgetID]);

  //calculate total spent per month when categories changes

  //deleting of categories
  const removeCat = dataItem => {
    const { id, name } = dataItem;
    if (confirm(`are you dsure you want to remove ${name}?`)) {
      firebase
        .firestore()
        .collection("categories")
        .doc(id)
        .delete()
        .then(() => {});
    }
  };
  return (
    <div>
      <h1>Add/Edit Categories</h1>
      Add your categories to the grid below and you will see how your total
      budgeted matches your total spent.
      <Grid style={{ height: "400px" }} data={categories}>
        <Column field="name" title="Name" width="40px" />
        <Column field="amount" title="amount" width="40px" format="{0:c2}" />
        <Column
          field="totalSpent"
          title="Total Spent"
          width="40px"
          format="{0:c2}"
        />
        <Column
          title="Delete"
          cell={props => {
            const { dataItem } = props;
            return (
              <td>
                <Button
                  onClick={e => {
                    e.preventDefault();
                    removeCat(dataItem);
                  }}
                >
                  Remove
                </Button>
              </td>
            );
          }}
        ></Column>
        <Column
          title="View Transactions"
          cell={props => {
            const { dataItem } = props;

            return (
              <td>
                <NavLink to={`/transactions/${dataItem.id}/${budgetID}`}>
                  View Transactions
                </NavLink>
              </td>
            );
          }}
        ></Column>
      </Grid>
      <h1>Add Category</h1>
      <form>
        <Input
          label="Category name"
          value={name}
          onChange={e => {
            setName(e.target.value);
          }}
        />
        <NumericTextBox
          label="Amount"
          value={amount}
          id="txtAmount"
          format="n2"
          onChange={e => {
            setAmount(e.target.value);
          }}
        />
        <Button
          primary={true}
          onClick={e => {
            e.preventDefault();
            const budget = { name, amount, budgetID, totalSpent: 0 };
            firebase
              .firestore()
              .collection("categories")
              .add(budget)
              .then(() => {
                setName("");
                setAmount(0);
              });
          }}
        >
          Add
        </Button>
      </form>
    </div>
  );
};
Categories.propTypes = {
  budgetID: PropTypes.string,
  setTotalSpent: PropTypes.func,
  dataItem: PropTypes.object
};
export default Categories;
