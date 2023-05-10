import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AdminLogin from "./components/AdminLogin";
import AdminRegister from "./components/AdminRegister";
import AdminProfile from "./components/AdminProfile";
import MedicineCategory from "./components/MedicineCategory";
import AddCategory from "./components/AddCategory";
import UpdateCategory from "./components/UpdateCategory";
import MedicineTypes from "./components/MedicineTypes";
import AddType from "./components/AddType";
import UpdateType from "./components/UpdateType";
import Inventory from "./components/Inventory";
import AddMedicine from "./components/AddMedicine";
import UpdateMedicine from "./components/UpdateMedicine";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/login" element={<AdminLogin />} />
        <Route exact path="/register" element={<AdminRegister />} />
        <Route exact path="/profile" element={<AdminProfile />} />
        <Route exact path="/categories" element={<MedicineCategory />} />
        <Route exact path="/addcategory" element={<AddCategory />} />
        <Route exact path="/updatecategory" element={<UpdateCategory />} />
        <Route exact path="/types" element={<MedicineTypes />} />
        <Route exact path="/addtype" element={<AddType />} />
        <Route exact path="/updatetype" element={<UpdateType />} />
        <Route exact path="/inventory" element={<Inventory />} />
        <Route exact path="/addmedicine" element={<AddMedicine />} />
        <Route exact path="/updatemedicine" element={<UpdateMedicine />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

