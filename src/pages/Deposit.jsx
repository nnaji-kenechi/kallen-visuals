import { useParams } from 'react-router-dom'

// Mock data — Phase 2 will fetch this from the backend by reference
const mockBooking = {
  ref: 'KV-2606-001',
  name: 'Adaeze Okonkwo',
  event: 'Wedding',
  date: '2026-08-15',
  package: 'Regular — ₦289,999',
  total: 289999,
  deposit: 100000,
}

export default function Deposit() {
  const { ref } = useParams()
  const booking = { ...mockBooking, ref: ref || mockBooking.ref }
  const balance = booking.total - booking.deposit

  const handleUpload = (e) => {
    if (e.target.files[0]) {
      alert(`File "${e.target.files[0].name}" ready to upload. (Phase 2 will send this to AWS S3.)`)
    }
  }

  return (
    <div className="py-16 px-6 max-w-xl mx-auto">
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 mb-8">
        <p className="text-xs text-[#C9A96E] tracking-widest uppercase mb-1">{booking.ref}</p>
        <h2 className="font-serif text-2xl text-[#1A1A2E] mb-6">{booking.name}'s Booking</h2>

        <Row label="Event" value={booking.event} />
        <Row label="Date" value={new Date(booking.date).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })} />
        <Row label="Package" value={booking.package} />
        <Row label="Total Amount" value={`₦${booking.total.toLocaleString()}`} />
        <Row label="Deposit Due" value={`₦${booking.deposit.toLocaleString()}`} highlight />
        <Row label="Balance After Deposit" value={`₦${balance.toLocaleString()}`} bold last />
      </div>

<div className="bg-[#1A1A2E] text-white rounded-lg p-6 mb-8">
        <h3 className="text-xs text-[#C9A96E] tracking-widest uppercase mb-4">Payment Details</h3>
        <Row label="Bank" value="UBA" dark />
        <Row label="Account Name" value="Nnaji Kenechi Anthony" dark />
        <Row label="Account Number" value="2065025646" dark last />
      </div>

      <h3 className="font-semibold text-[#1A1A2E] mb-4">Upload Proof of Payment</h3>
      <label className="block border-2 border-dashed border-gray-200 rounded-lg p-10 text-center cursor-pointer hover:border-[#C9A96E] transition">
        <svg className="mx-auto mb-3 text-gray-400" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <p className="text-sm text-gray-500"><strong className="text-[#1A1A2E]">Tap to upload</strong> your payment proof</p>
        <p className="text-xs text-gray-400 mt-1">JPG, PNG or PDF accepted</p>
        <input type="file" accept="image/*,.pdf" className="hidden" onChange={handleUpload} />
      </label>

      <button className="w-full bg-[#C9A96E] text-[#1A1A2E] py-4 rounded font-semibold mt-6 hover:bg-[#1A1A2E] hover:text-white transition">
        Confirm Deposit Upload
      </button>

      <div className="text-center mt-4">
        <a href="https://wa.me/2348110132427" target="_blank" rel="noreferrer" className="text-sm text-[#C9A96E] hover:underline">
          Having trouble? Chat with us →
        </a>
      </div>
    </div>
  )
}

function Row({ label, value, highlight, bold, dark, last }) {
  return (
    <div className={`flex justify-between text-sm py-2 ${last ? '' : dark ? 'border-b border-white/10' : 'border-b border-gray-200'}`}>
      <span className={dark ? 'text-white/60' : 'text-gray-500'}>{label}</span>
      <span className={`${bold ? 'font-semibold' : ''} ${highlight ? 'text-[#C9A96E] font-semibold' : dark ? 'text-white' : 'text-[#1A1A2E]'}`}>
        {value}
      </span>
    </div>
  )
}
