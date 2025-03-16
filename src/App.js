import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./screen/Login";  // Corrected path
import Signup from "./screen/Signup";  // Corrected path

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Screen/Login" element={<Login />} />
        <Route path="/Screen/Signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;



/*
function App() {
  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary">Bootstrap is Working! div n pre n roh we r on
      </h1>
      <button className="btn btn-success">Click Me</button>
    </div>
  );
}

export default App;

*/
/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/



