import React, { useState, useEffect } from "react";
import Alert from "@reach/alert";
import { useParams, useHistory } from "react-router-dom";
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
  const params = useParams();
  const history = useHistory();
  const firebase = useFirebaseApp();

  const [month, setMonth] = useState({
    value: !params.month ? 10 : params.month
  });
  const [year, setYear] = useState(!params.year ? 2019 : params.year);
  const [income, setIncome] = useState(0);
  const [totalBudgeted, setTotalBudgeted] = useState(0);
  const [msg, setMsg] = useState("");
  const setAlert = alert => {
    setMsg(alert);

    setTimeout(() => {
      setMsg("");
    }, 5000);
  };

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
        .set(budget, { merge: true });
    } catch (e) {
      console.table(e);
    }
  }
  useEffect(() => {
    async function getBudget() {
      if (!user.uid) return;
      return await firebase
        .firestore()
        .collection("budgets")
        .doc(`${user.uid}${year}${month.value}`)
        .onSnapshot(doc => {
          if (doc.exists) {
            const data = doc.data();

            setIncome(data.income);
            setTotalBudgeted(data.totalBudgeted);
          } else {
            setIncome(0);
            setTotalBudgeted(0);
          }
        });
    }
    getBudget();
  }, [month, year, user, firebase]);
  //set month and year if params change
  useEffect(() => {
    setMonth({ value: parseInt(params.month) });
    setYear(params.year);
  }, [params]);
  useEffect(() => {
    const totalLeft = parseFloat(income) - parseFloat(totalBudgeted);
    setAlert(`There is ${formatMoney(totalLeft, 2, ".", ",")} left to budget.`);
  }, [totalBudgeted, income]);
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
            history.push(`/budget/${e.target.value.value}/${year}`);
          }}
        />
      </p>
      <p>
        <DropDownList
          label="Year"
          data={years}
          value={year}
          onChange={e => {
            history.push(`/budget/${month.value}/${e.target.value}`);
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
        }}
      >
        Save
      </Button>
      <Categories budgetID={`${user.uid}${year}${month.value}`} />
      <h1>Status</h1>
      <ul>
        <li>Total Income: {formatMoney(income, 2, ".", ",")}</li>
        <li>Total Spent: {formatMoney(totalBudgeted, 2, ".", ",")}</li>
      </ul>
      <Alert>{msg}</Alert>
    </div>
  );
};
export default Budget;
