import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Register from "./pages/Register/Register";
import CheckStatut from "./pages/CheckStatut/CheckStatut";
import Home from "./pages/Home/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/check-status" element={<CheckStatut />} />
        
        <Route path="/admin" element={<Layout />}>
          <Route index element={<div className="p-6">Tableau de bord</div>} />
          <Route path="requisition" element={<div className="p-6">Requisitions</div>} />
          <Route path="configuration" element={<div className="p-6">Configuration</div>} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
