import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Home.jsx'
import Terms from './Terms.jsx'
import RegisterBusiness from './RegisterBusiness.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/register-business" element={<RegisterBusiness />} />
      </Routes>
    </Router>
  )
}

export default App

