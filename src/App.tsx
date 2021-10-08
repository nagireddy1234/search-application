import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
const CssWizardry = React.lazy(() => import("./pages/cssWizardry"));
const Search = React.lazy(() => import("./pages/search"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>loading...</div>}>
        <Router>
          <Switch>
            <Route exact path="/" component={CssWizardry} />
            <Route exact path="/search" component={Search} />
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
