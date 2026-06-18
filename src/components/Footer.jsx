import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#1A1A2E] text-gray-300 px-6 pt-12 pb-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
        <div>
          <span className="font-serif text-xl text-white block">Kallen Visuals</span>
          <span className="text-[10px] text-[#C9A96E] tracking-widest uppercase">Creating Timeless Memories</span>
          <p className="text-sm mt-3 leading-relaxed">
            Professional event photography and videography available for all kinds of events across Nigeria.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-white tracking-widest uppercase mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/" className="hover:text-[#C9A96E]">Home</Link>
            <Link to="/portfolio" className="hover:text-[#C9A96E]">Portfolio</Link>
            <Link to="/pricing" className="hover:text-[#C9A96E]">Pricing</Link>
            <Link to="/booking" className="hover:text-[#C9A96E]">Book Now</Link>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-white tracking-widest uppercase mb-4">Contact</h4>
          <div className="flex flex-col gap-2 text-sm">
            <a href="tel:08037439735" className="hover:text-[#C9A96E]">08037439735</a>
            <a href="tel:08110132427" className="hover:text-[#C9A96E]">08110132427</a>
            <a href="https://wa.me/2348110132427" target="_blank" rel="noreferrer" className="hover:text-[#C9A96E]">WhatsApp Us</a>
            <a href="mailto:nnajikenechia@gmail.com" className="hover:text-[#C9A96E]">nnajikenechia@gmail.com</a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto border-t border-white/10 pt-5 flex flex-wrap justify-between gap-2 text-xs">
        <span>© {new Date().getFullYear()} Kallen Visuals. All rights reserved.</span>
        <span className="text-[#C9A96E]">Creating Timeless Memories</span>
      </div>
    </footer>
  )
}
