import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Home.jsx'
import Terms from './Terms.jsx'
import RegisterBusiness from './RegisterBusiness.jsx'
import Admin from './Admin/Admin.jsx'
import AddInventory from './Admin/AddInventory.jsx'
import AdminLogin from './Admin/AdminLogin.jsx'
import Inventory from './Admin/Inventory.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/register-business" element={<RegisterBusiness />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/add-inventory" element={<AddInventory />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/inventory" element={<Inventory />} />
      </Routes>
    </Router>
  )
}

export default App

