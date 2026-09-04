import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ReportRisk from './pages/ReportRisk';
import Reports from './pages/Reports';
import ManageReports from './pages/ManageReports';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<ReportRisk />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/manage" element={<ManageReports />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
