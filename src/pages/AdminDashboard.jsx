import { useState } from 'react'

const initialBookings = [
  { ref: 'KV-2606-001', name: 'Adaeze Okonkwo', phone: '08023456789', event: 'Wedding', date: '2026-08-15', location: 'Enugu', package: 'Regular — ₦289,999', status: 'confirmed', total: 289999, deposit: 100000 },
  { ref: 'KV-2606-002', name: 'Chukwuemeka Eze', phone: '08134567890', event: 'Corporate Event', date: '2026-07-20', location: 'Abuja', package: 'Budget — ₦219,999', status: 'pending', total: 0, deposit: 0 },
  { ref: 'KV-2606-003', name: 'Ngozi Abia', phone: '09012345678', event: 'Burial', date: '2026-07-05', location: 'Owerri', package: 'Tight Budget — ₦149,999', status: 'deposit-paid', total: 149999, deposit: 70000 },
  { ref: 'KV-2606-004', name: 'Tunde Balogun', phone: '08098765432', event: 'Coronation', date: '2026-06-28', location: 'Lagos', package: 'Silver — ₦399,999', status: 'completed', total: 399999, deposit: 200000 },
]

const statusStyles = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  'deposit-paid': 'bg-green-100 text-green-800',
  completed: 'bg-gray-100 text-gray-700',
}

const statusLabels = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  'deposit-paid': 'Deposit Paid',
  completed: 'Completed',
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState(initialBookings)
  const [tab, setTab] = useState('dashboard')

  const counts = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === 'pending').length,
    confirmed: bookings.filter((b) => b.status === 'confirmed').length,
    completed: bookings.filter((b) => b.status === 'completed').length,
  }

  return (
    <div className="min-h-screen bg-gray-50 -mt-[68px] pt-[68px] flex flex-col md:flex-row">
      {/* SIDEBAR */}
      <div className="bg-[#1A1A2E] md:w-56 flex md:flex-col">
        <div className="hidden md:block p-6 border-b border-white/10">
          <p className="font-serif text-white text-lg">Kallen Visuals</p>
          <p className="text-[10px] text-[#C9A96E] tracking-widest uppercase mt-1">Admin</p>
        </div>
        <button
          onClick={() => setTab('dashboard')}
          className={`px-6 py-3 text-sm text-left ${tab === 'dashboard' ? 'bg-white/10 text-white border-l-2 border-[#C9A96E]' : 'text-white/60'}`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setTab('bookings')}
          className={`px-6 py-3 text-sm text-left ${tab === 'bookings' ? 'bg-white/10 text-white border-l-2 border-[#C9A96E]' : 'text-white/60'}`}
        >
          Bookings
        </button>
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-6 md:p-10">
        {tab === 'dashboard' && (
          <>
            <h2 className="font-serif text-2xl text-[#1A1A2E] mb-6">Dashboard</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Kpi label="Total Bookings" value={counts.total} />
              <Kpi label="Pending" value={counts.pending} />
              <Kpi label="Confirmed" value={counts.confirmed} />
              <Kpi label="Completed" value={counts.completed} />
            </div>
            <BookingsTable bookings={bookings} compact />
          </>
        )}

        {tab === 'bookings' && (
          <>
            <h2 className="font-serif text-2xl text-[#1A1A2E] mb-6">All Bookings</h2>
            <BookingsTable bookings={bookings} />
          </>
        )}
      </div>
    </div>
  )
}

function Kpi({ label, value }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{label}</p>
      <p className="font-serif text-2xl text-[#1A1A2E]">{value}</p>
    </div>
  )
}

function BookingsTable({ bookings, compact }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 text-left text-xs text-gray-500 uppercase tracking-wide">
            <th className="px-4 py-3">Reference</th>
            <th className="px-4 py-3">Client</th>
            <th className="px-4 py-3">Event</th>
            <th className="px-4 py-3">Date</th>
            {!compact && <th className="px-4 py-3">Package</th>}
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.ref} className="border-t border-gray-100">
              <td className="px-4 py-3 font-medium text-[#1A1A2E]">{b.ref}</td>
              <td className="px-4 py-3">
                {b.name}
                <br />
                <span className="text-gray-400 text-xs">{b.phone}</span>
              </td>
              <td className="px-4 py-3">{b.event}</td>
              <td className="px-4 py-3">{new Date(b.date).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
              {!compact && <td className="px-4 py-3">{b.package}</td>}
              <td className="px-4 py-3">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[b.status]}`}>
                  {statusLabels[b.status]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
