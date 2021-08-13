module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"], //remove unused css styles *tree shaking*
  variants: {
    extend: {},
  },
  plugins: [],
  theme: {
    extend: {
      colors: {
        "th-background": "var(--th-background)",
        "th-text": "var(--th-text)",
        "th-linkText": "var(--th-linkText)",
        "th-linkTextSecondary": "var(--th-linkTextSecondary)",
        "th-popUp": "var(--th-popUp)",
        "th-error": "var(--th-error)",
      },
    },
  },
};
