import React, { useEffect, useState } from "react";
import { DEFAULT_THEME } from "./themes";
import { applyTheme } from "./themes/utils";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./features/landingPage/LandingPage";
import GamePage from "./features/gamePage/GamePage";

function App() {
  const [theme, setTheme] = useState(DEFAULT_THEME);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          component={() => {
            return (
              <LandingPage theme={theme} setTheme={setTheme}></LandingPage>
            );
          }}
        ></Route>
        <Route
          path="/gamePage"
          component={() => {
            return <GamePage></GamePage>;
          }}
        ></Route>
      </Switch>
    </Router>
  );
}

export default App;
