import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Home.jsx'
import Terms from './Terms.jsx'
import RegisterBusiness from './RegisterBusiness.jsx'
import Admin from './Admin/Admin.jsx'
import AdminLogin from './Admin/AdminLogin.jsx'
import PrivacyPolicy from './Privacy.jsx'
import Merchants from './Admin/Merchants.jsx'
import Categories from './Admin/Categories.jsx'
import Products from './Admin/Products.jsx'
import AddProduct from './Admin/AddProduct.jsx'
import Users from './Admin/Users.jsx'
import Error404 from './Error404.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/register-business" element={<RegisterBusiness />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/products/add" element={<AddProduct />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/products" element={<Products />} />
        <Route path="/admin/merchants" element={<Merchants />} />
        <Route path="/admin/categories" element={<Categories />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  )
}

export default App

