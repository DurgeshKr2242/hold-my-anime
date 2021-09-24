import React from "react";
import "./App.css";
import Main from "./Components/Main/Main";
import Navbar from "./Components/Navbar/Navbar";
import SideBar from "./Components/Sidebar Left/SideBar";
import { AuthProvider } from "./AuthContext";
function App() {
  return (
    <AuthProvider>
      <div>
        <div className="navbar">
          <Navbar />
        </div>
        <div className="row">
          <div className="col1">
            <SideBar />
          </div>
          <div className="col2">
            <Main />
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
