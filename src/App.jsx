import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Register from "./pages/Register/Register";
import CheckStatut from "./pages/CheckStatut/CheckStatut";
import Home from "./pages/Home/Home";
import Configuration from "./pages/Configuration/Configuration";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/check-status" element={<CheckStatut />} />
        
        <Route path="/admin" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="requisition" element={<div className="p-6">Requisitions</div>} />
          <Route path="configuration" element={<Configuration />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
