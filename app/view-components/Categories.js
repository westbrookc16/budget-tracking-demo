import React, { useContext, useState, useEffect } from "react";
import { formatMoney } from "../utils/numbers";
import { FirebaseContext } from "../firebase/firebase";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { Button } from "@progress/kendo-react-buttons";
import {
  NumericTextBox,
  MaskedTextBox,
  Input,
  Switch,
  Slider,
  ColorGradient,
  ColorPalette,
  ColorPicker
} from "@progress/kendo-react-inputs";
import {
  AutoComplete,
  ComboBox,
  DropDownList,
  MultiSelect
} from "@progress/kendo-react-dropdowns";

const Categories = ({ budgetID, setTotalSpent }) => {
  const [categories, setCategories] = useState([]);
  const firebase = useContext(FirebaseContext);
  //variables for new category addition
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    async function getCategories() {
      try {
        const data = await firebase.db
          .collection("categories")
          .where("budgetID", "==", budgetID)
          .get();
        let tempCats = [];
        data.forEach(doc => {
          tempCats = [...tempCats, { id: doc.id, ...doc.data() }];
        });

        setCategories(tempCats);
      } catch (e) {
        console.table(e);
      }
    }
    getCategories();
  }, [firebase.db, budgetID]);

  //calculate total spent per month when categories changes
  useEffect(() => {
    const total = categories.reduce(
      (accumulator, c, i) => accumulator + parseFloat(c.amount),
      0
    );
    setTotalSpent(formatMoney(total, 2, ".", ","));
    console.log(`total=${total}`);
  }, [setTotalSpent, categories]);
  //deleting of categories
  const removeCat = dataItem => {
    const { id, name } = dataItem;
    if (confirm(`are you dsure you want to remove ${name}?`)) {
      firebase.db
        .collection("categories")
        .doc(id)
        .delete()
        .then(u => {
          setCategories(c => {
            return c.filter(value => value.id !== id);
          });
        });
    }
  };
  return (
    <div>
      <h1>Add/Edit Categories</h1>
      Add your categories to the grid below and you will see how your total
      budgeted matches your total spent.
      <Grid style={{ height: "400px" }} data={categories}>
        <Column field="name" title="Name" width="40px" />
        <Column field="amount" title="amount" width="40px" />
        <Column
          title="Delete"
          cell={props => {
            const { dataItem } = props;
            return (
              <td>
                <button
                  onClick={e => {
                    e.preventDefault();
                    removeCat(dataItem);
                  }}
                >
                  Remove
                </button>
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
        <button
          primary="true"
          onClick={e => {
            e.preventDefault();
            const budget = { name, amount, budgetID };
            firebase.db
              .collection("categories")
              .add(budget)
              .then(doc => {
                setCategories(c => {
                  return [...c, { id: doc.id, ...budget }];
                });
              });
          }}
        >
          Add
        </button>
      </form>
    </div>
  );
};
export default Categories;
