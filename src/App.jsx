import Deposit from './pages/Deposit'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Pricing from './pages/Pricing'
import Booking from './pages/Booking'

export default function App() {
  return (
    <>
      <Navbar />
      <div className="pt-[68px]">
        <Routes>
	  <Route path="/deposit/:ref" element={<Deposit />} />
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </div>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
