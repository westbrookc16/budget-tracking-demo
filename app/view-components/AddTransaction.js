import React, { useState, useEffect } from "react";
import { Button } from "@progress/kendo-react-buttons";
import { PropTypes } from "prop-types";
import { useFirebaseApp } from "reactfire";
import "firebase/firestore";

import { Input, NumericTextBox } from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { DateInput } from "@progress/kendo-react-dateinputs";
const AddTransaction = ({ budgetID, defaultCategory }) => {
  const firebase = useFirebaseApp();
  const [categories, setCategories] = useState([]);
  async function transactionSubmit() {
    try {
      await firebase
        .firestore()
        .collection("transactions")
        .add(form);
      setForm(defaultForm);
    } catch (e) {
      console.table(e);
    }
  }
  useEffect(() => {
    async function getCategories() {
      const catListRef = firebase
        .firestore()
        .collection("categories")
        .where("budgetID", "==", budgetID)
        .orderBy("name");
      try {
        const catListDoc = await catListRef.get();
        let tempCats = [];
        catListDoc.forEach(
          u => {
            tempCats.push({ id: u.id, ...u.data() });
          },
          [firebase]
        );
        setCategories(tempCats);
      } catch (e) {
        console.table(e);
      }
    }
    getCategories();
  }, [firebase, budgetID]);

  const defaultForm = {
    name: "",
    amount: 0,
    date: new Date(),
    category: { ...defaultCategory }
  };
  const [form, setForm] = useState(defaultForm);
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => {
      return { ...f, [name]: value };
    });
  };
  const { name, amount, date, category } = form;
  return (
    <div>
      <h1>Add Transaction</h1>
      <Input
        name="name"
        value={name}
        onChange={handleChange}
        label="name"
        id="name"
      />
      <NumericTextBox
        value={amount}
        name="amount"
        onChange={handleChange}
        label="Amount"
      />
      <DateInput
        value={date}
        name="date"
        label="Date"
        id="date"
        onChange={handleChange}
      />
      <DropDownList
        id="category"
        data={categories}
        name="category"
        value={category}
        onChange={handleChange}
        label="Category"
        dataItemKey="id"
        textField="name"
      />
      <Button
        primary={true}
        onClick={e => {
          e.preventDefault();
          transactionSubmit();
        }}
      >
        Add
      </Button>
    </div>
  );
};
AddTransaction.propTypes = {
  //categoryID: PropTypes.string,
  budgetID: PropTypes.string,
  defaultCategory: PropTypes.object
};
export default AddTransaction;
