import AdminDashboard from './pages/AdminDashboard'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Pricing from './pages/Pricing'
import Booking from './pages/Booking'
import Deposit from './pages/Deposit'
import AdminLogin from './pages/AdminLogin'

export default function App() {
  return (
    <>
      <Navbar />
      <div className="pt-[68px]">
        <Routes>
	  <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/deposit/:ref" element={<Deposit />} />
          <Route path="/admin-login" element={<AdminLogin />} />
        </Routes>
      </div>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
