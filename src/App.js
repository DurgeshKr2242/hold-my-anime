import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Main from "./Components/Main/Main";
import Navbar from "./Components/Navbar/Navbar";
import SideBar from "./Components/Sidebar Left/SideBar";
import { AuthProvider } from "./AuthContext";
import RandomQuote from "./Components/RandomQuote/RandomQuote";
import Search from "./Pages/Search/Search";
function App() {
  return (
    <Router>
      <AuthProvider>
        <div>
          <div className="navbar">
            <Navbar />
          </div>

          <Switch>
            <Route exact path="/">
              <RandomQuote />
              <div className="row">
                <div className="col1">
                  <SideBar />
                </div>
                <div className="col2">
                  <Main />
                </div>
              </div>
            </Route>
            <Route path="/search">
              <Search />
            </Route>
          </Switch>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
