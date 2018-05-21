import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import InfintePage from "./pages/InfintePage";
import SortedPage from './pages/SortedPage';
import 'react-virtualized/styles.css';

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <ul>
            <li>
              <Link to="/infinte">InfintePage</Link>
            </li>
            <li>
              <Link to="/sorted">SortedPage</Link>
            </li>
          </ul>
          <hr />
          <Route path="/infinte" component={InfintePage} />
          <Route path="/sorted" component={SortedPage} />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
