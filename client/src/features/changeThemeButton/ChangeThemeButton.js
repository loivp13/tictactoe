import React from "react";

const ChangeThemeButton = ({ children, onClick = () => {} }) => {
  const baseClasses =
    "border-2 outline-none focuse:outline-none normal-case tracking-wide font-semibold rounded shadow-xl text-xs px-4 py-2";
  const colorClasses =
    "border-primary active:bg-primary-background text-primary bg-sec-background";
  return (
    <button
      className={`${baseClasses} ${colorClasses}`}
      type="button"
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
};

export default ChangeThemeButton;
