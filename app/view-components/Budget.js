import React, { useCallback, useState, useContext, useEffect } from "react";
import Alert from "@reach/alert";
import { formatMoney } from "../utils/numbers";
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
import { UserContext } from "../firebase/FirebaseUser";
import { FirebaseContext } from "../firebase/firebase";
import Categories from "./Categories";
const Budget = props => {
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
  const user = useContext(UserContext);
  const firebase = useContext(FirebaseContext);

  const [month, setMonth] = useState({ value: 10 });
  const [year, setYear] = useState("2019");
  const [income, setIncome] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [msg, setMsg] = useState("");
  const setAlert = alert => {
    setMsg(alert);
    console.log(alert);
    setTimeout(() => {
      setMsg("");
      console.log("timeout");
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
      console.log(`income=${income}`);
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
      await firebase.db
        .collection("budgets")
        .doc(`${user.uid}${year}${month.value}`)
        .set(budget);
    } catch (e) {
      console.table(e);
    }
  }
  useEffect(() => {
    async function getBudget() {
      const doc = await firebase.db
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
  }, [month, year, user, firebase.db]);
  return (
    <div>
      <h1>Budget Management</h1>
      <p>
        <label htmlFor="ddlMonth">Month</label>
        <DropDownList
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
        <label htmlFor="ddlYear">Year</label>
        <DropDownList
          data={years}
          value={year}
          onChange={e => {
            setYear(e.target.value);
          }}
        />
      </p>
      <p>
        <label htmlFor="txtIncome">Monthly Income</label>
        <NumericTextBox
          value={income}
          id="txtIncome"
          format="c2"
          onChange={e => {
            setIncome(e.target.value);
          }}
        />
      </p>
      <Button
        primary={true}
        onClick={e => {
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
      <table>
        <thead>
          <tr>
            <th>Total Income</th>
            <th>Total Spent</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{formatMoney(income, 2, ".", ",")}</td>
            <td>{formatMoney(totalSpent, 2, ".", ",")}</td>
          </tr>
        </tbody>
      </table>
      <Alert>{msg}</Alert>
    </div>
  );
};
export default Budget;
