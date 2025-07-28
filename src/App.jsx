import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Home.jsx'
import Terms from './Terms.jsx'
import RegisterBusiness from './RegisterBusiness.jsx'
import PrivacyPolicy from './Privacy.jsx'
import Error404 from './Error404.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/register-business" element={<RegisterBusiness />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  )
}

export default App

