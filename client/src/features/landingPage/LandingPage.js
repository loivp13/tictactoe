import React from "react";
import ChangeThemeButton from "../changeThemeButton/ChangeThemeButton";

export default function LandingPage({ setTheme, theme }) {
  return (
    <div className={"bg-th-background"}>
      Landing
      <div className="bg-th-text">tset</div>
      <div className="bg-th-linkText">tset</div>
      <div className="bg-th-linkTextSecondary">tset</div>
      <div className="bg-th-popUp">tset</div>
      <div className="bg-th-error">tset</div>
      {theme === "base" ? (
        <ChangeThemeButton onClick={() => setTheme("slateTeal")}>
          Apply seafromGreen Theme
        </ChangeThemeButton>
      ) : (
        <ChangeThemeButton onClick={() => setTheme("base")}>
          Apply Light Theme
        </ChangeThemeButton>
      )}
    </div>
  );
}
