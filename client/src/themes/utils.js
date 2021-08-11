import { themes } from "./index";

export const mapTheme = (variables) => {
  return {
    "--th-background": variables.backgroundColor || "",
    "--th-text": variables.text || "",
    "--th-linkText": variables.linkText || "",
    "--th-linkTextSecondary": variables.linkTextSecondary || "",
    "--th-popUp": variables.popUp || "",
    "--th-shadow": variables.shadow || "",
    "--th-error": variables.error || "",
  };
};

export const applyTheme = (theme) => {
  const themeObject = mapTheme(themes[theme]);
  if (!themeObject) return;

  const root = document.documentElement;
  Object.keys(themeObject).forEach((property) => {
    if (property === "name") {
      return;
    }

    root.style.setProperty(property, themeObject[property]);
  });
};

export const extend = (extending, newTheme) => {
  return {
    ...extending,
    ...newTheme,
  };
};
