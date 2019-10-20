import React, { useCallback, useState, useEffect } from "react";
import Alert from "@reach/alert";
import { formatMoney } from "../utils/numbers";
import { Button } from "@progress/kendo-react-buttons";
import { NumericTextBox } from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";

import { useFirebaseApp, useUser } from "reactfire";
import "firebase/firestore";
import Categories from "./Categories";
const Budget = () => {
  document.title = "Budget Management";
  const years = ["2019", "2020", "2021"];
  const months = [
    { text: "Jan", value: 1 },
    { text: "Feb", value: 2 },
    { text: "Mar", value: 3 },
    { text: "Apr", value: 4 },
    { text: "May", value: 5 },
    { text: "Jun", value: 6 },
    { text: "Jul", value: 7 },
    { text: "Aug", value: 8 },
    { text: "Sep", value: 9 },
    { text: "Oct", value: 10 },
    { text: "Nov", value: 11 },
    { text: "Dec", value: 12 }
  ];
  const user = useUser();
  const firebase = useFirebaseApp();

  const [month, setMonth] = useState({ value: 10 });
  const [year, setYear] = useState("2019");
  const [income, setIncome] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [msg, setMsg] = useState("");
  const setAlert = alert => {
    setMsg(alert);

    setTimeout(() => {
      setMsg("");
    }, 5000);
  };
  const setTotalSpentAndAlert = useCallback(
    e => {
      setTotalSpent(e);

      setAlert(
        `There is ${formatMoney(
          parseFloat(income) - parseFloat(e.replace(",", "").replace("$", "")),
          2,
          ".",
          ","
        )} left to budget.`
      );
    },
    [setTotalSpent, income]
  );
  async function setBudget() {
    try {
      const budget = {
        year,
        income,
        month: month.value
      };
      await firebase
        .firestore()
        .collection("budgets")
        .doc(`${user.uid}${year}${month.value}`)
        .set(budget);
    } catch (e) {
      console.table(e);
    }
  }
  useEffect(() => {
    async function getBudget() {
      if (!user.uid) return;
      const doc = await firebase
        .firestore()
        .collection("budgets")
        .doc(`${user.uid}${year}${month.value}`)
        .get();
      if (doc.exists) {
        const data = doc.data();

        setIncome(data.income);
      } else {
        setIncome(0);
      }
    }
    getBudget();
  }, [month, year, user, firebase]);

  return (
    <div>
      <h1>Budget Management</h1>
      <p>
        <DropDownList
          label="Month"
          data={months}
          textField="text"
          dataItemKey="value"
          id="ddlMonth"
          value={month}
          onChange={e => {
            setMonth(e.target.value);
            //alert(month);
          }}
        />
      </p>
      <p>
        <DropDownList
          label="Year"
          data={years}
          value={year}
          onChange={e => {
            setYear(e.target.value);
          }}
        />
      </p>
      <p>
        <NumericTextBox
          label="Monthly Income"
          value={income}
          id="txtIncome"
          format="n2"
          onChange={e => {
            setIncome(e.target.value);
          }}
        />
      </p>
      <Button
        primary={true}
        onClick={e => {
          e.preventDefault();
          setBudget();
          setAlert(`Your budget was saved successfully.`);
          //alert("budget set successfully");
        }}
      >
        Save
      </Button>
      <Categories
        budgetID={`${user.uid}${year}${month.value}`}
        setTotalSpent={setTotalSpentAndAlert}
      />
      <h1>Status</h1>
      <ul>
        <li>Total Income: {formatMoney(income, 2, ".", ",")}</li>
        <li>Total Spent: {totalSpent}</li>
      </ul>
      <Alert>{msg}</Alert>
    </div>
  );
};
export default Budget;
