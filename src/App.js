import "./App.css";
import Main from "./Components/Main/Main";
import Navbar from "./Components/Navbar/Navbar";
import SideBar from "./Components/Sidebar Left/SideBar";

function App() {
  return (
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
  );
}

export default App;
