import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Checks from "./pages/checks";
import Logs from "./pages/logs";
import Register from "./pages/register";
import "./App.css";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checks" element={<Checks />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/register" element={<Register />} />
      
      </Routes>
    </Router>
  );
}

export default App;
