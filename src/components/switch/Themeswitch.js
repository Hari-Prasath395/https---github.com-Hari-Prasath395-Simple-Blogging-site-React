import React from "react";
import "./Themeswitch.css";
import { useThemeContext } from "../../hooks/useThemeContext";

export default function Themeswitch() {
  const { theme, dispatch } = useThemeContext();

  const switchTheme = () => {
    if (theme === "light") {
      dispatch({ type: "Dark" });
    } else {
      dispatch({ type: "LIGHT" });
    }
    console.log(theme);
  };
  return (
    <div className="container">
      <div className="form-check form-switch toggle">
        <input
          className="form-check-input"
          type="checkbox"
          id="flexSwitchCheckDefault"
          onClick={switchTheme}
        />
      </div>
    </div>
  );
}
