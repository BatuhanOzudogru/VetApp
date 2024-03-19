import { Route, Routes } from "react-router-dom";
import "./App.css";

import Customer from "./Pages/Customer/Customer";
import Animal from "./Pages/Animal/Animal";
import Doctor from "./Pages/Doctor/Doctor";
import Report from "./Pages/Report/Report";
import Vaccine from "./Pages/Vaccine/Vaccine";
import Appointment from "./Pages/Appointment/Appointment";
import Navbar from "./Components/Navbar";
import HomePage from "./Pages/HomePage/HomePage"; 

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/animal" element={<Animal />} />
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/report" element={<Report />} />
        <Route path="/vaccine" element={<Vaccine />} />
      </Routes>
    </>
  );
}

export default App;
