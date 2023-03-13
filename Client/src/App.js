import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminSignIn from "./pages/admin/AdminSignIn";
import AdminSignUp from "./pages/admin/AdminSignUp";
import DonorSignIn from "./pages/donor/DonorSignIn";
import DonorSignUp from "./pages/donor/DonorSignUp";
import DonorHomePage from "./pages/donor/DonorHomePage";
import AdminHomePage from "./pages/admin/AdminHomePage";
import CreateBloodBankPage from "./pages/admin/CreateBloodBankPage";
import BloodBankSignIn from "./pages/bloodBank/BloodBankSignIn";
import BloodBankHomePage from "./pages/bloodBank/BloodBankHomePage";
import DonorCertificate from "./pages/donor/DonorCertificate";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/donor/signup" element={<DonorSignUp />} />
        <Route path="/donor/signin" element={<DonorSignIn />} />
        <Route path="/donor" element={<DonorHomePage />} />

        <Route path="/admin/signin" element={<AdminSignIn />} />
        <Route path="/admin/signup" element={<AdminSignUp />} />
        <Route path="/admin" element={<AdminHomePage />} />
        <Route path="/admin/createBloodBank" element={<CreateBloodBankPage />} />

        <Route path="/bloodBank/signin" element={<BloodBankSignIn />} />
        <Route path="/bloodBank" element={<BloodBankHomePage />} />
        <Route path="/certificate" element={<DonorCertificate />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
