import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import InfintePage from "./pages/InfintePage";

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <ul>
            <li>
              <Link to="/infinte">InfintePage</Link>
            </li>
          </ul>

          <hr />
          <Route path="/infinte" component={InfintePage} />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
