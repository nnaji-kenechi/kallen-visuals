import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200 h-[68px] flex items-center justify-between px-6">
      <Link to="/" className="flex flex-col leading-tight">
        <span className="font-serif text-xl font-bold text-[#1A1A2E]">Kallen Visuals</span>
        <span className="text-[10px] text-[#C9A96E] tracking-widest uppercase">Creating Timeless Memories</span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        <Link to="/" className="text-sm font-medium text-gray-700 hover:text-[#C9A96E]">Home</Link>
        <Link to="/portfolio" className="text-sm font-medium text-gray-700 hover:text-[#C9A96E]">Portfolio</Link>
        <Link to="/pricing" className="text-sm font-medium text-gray-700 hover:text-[#C9A96E]">Pricing</Link>
        <Link
          to="/booking"
          className="bg-[#1A1A2E] text-white px-5 py-2 rounded text-sm font-medium hover:bg-[#C9A96E] hover:text-[#1A1A2E] transition"
        >
          Book Now
        </Link>
      </div>
    </nav>
  )
}
