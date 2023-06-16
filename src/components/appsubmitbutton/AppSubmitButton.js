import React from "react";
import "./AppSubmitButton.css";
import { useThemeContext } from "../../hooks/useThemeContext";

export default function AppSubmitButton({ onClick, title }) {
  const { theme } = useThemeContext();
  return (
    <button type="submit" onClick={onClick} className={`btn ${theme}btn`}>
      {title}
    </button>
  );
}
