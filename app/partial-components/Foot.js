import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Switch } from "@progress/kendo-react-inputs";

const Foot = () => {
  const context = useContext(AppContext);
  const isLight = context.themeMode === "light";

  const handleSwitch = () => {
    context.changeTheme(isLight ? "dark" : "light");
  };

  return (
    <div className="foot">
      Chris Westbrook &copy; 2019 | &nbsp;
      <Switch
        onChange={handleSwitch}
        checked={isLight}
        onLabel={"light theme"}
        offLabel={"dark theme"}
      />
    </div>
  );
};

export default Foot;
