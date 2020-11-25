import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';

import Produk from "./tugas/tugas";
import Appbar from  "./tugas/Appbar";


function App() {

  return (
    <Router>
    <div>
      <Appbar />
      <nav className="NavBar">
        <ul className="ul">
          <li className="li">
            <Link to="/"></Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/" exact component={Produk} />
      </Switch>


    </div>

  </Router>
  );
}

export default App;
