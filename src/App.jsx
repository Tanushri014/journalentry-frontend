import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import OtpPage from "./pages/OtpPage";
import DashboardPage from "./pages/DashboardPage";
import CreateJournalPage from "./pages/CreateJournalPage";

function App() {
  return (
    <Routes>

      <Route path="/" element={<LandingPage />} />

      <Route path="/register" element={<RegisterPage />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/verify-otp" element={<OtpPage />} />

      <Route path="/dashboard" element={<DashboardPage />} />

      <Route path="/journal/new" element={<CreateJournalPage />} />

    </Routes>
  );
}

export default App;