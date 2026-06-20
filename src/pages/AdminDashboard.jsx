import { useState, useEffect } from 'react'

const statusStyles = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  'deposit-paid': 'bg-green-100 text-green-800',
  'balance-due': 'bg-red-100 text-red-800',
  completed: 'bg-gray-100 text-gray-700',
}

const statusLabels = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  'deposit-paid': 'Deposit Paid',
  'balance-due': 'Balance Due',
  completed: 'Completed',
}

const allStatuses = ['pending', 'confirmed', 'deposit-paid', 'balance-due', 'completed']

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const res = await fetch('http://localhost:4001/bookings')
      const data = await res.json()
      // Map backend field names to what our UI expects
      const mapped = data.map((b) => ({
        ...b,
        event: b.eventType,
        location: b.eventLocation,
      }))
      setBookings(mapped)
    } catch (err) {
      console.error('Failed to fetch bookings', err)
    } finally {
      setLoading(false)
    }
  }
  const [tab, setTab] = useState('dashboard')
  const [selected, setSelected] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)
  const [form, setForm] = useState({ total: '', deposit: '' })
  const [toast, setToast] = useState('')

  const counts = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === 'pending').length,
    confirmed: bookings.filter((b) => b.status === 'confirmed').length,
    completed: bookings.filter((b) => b.status === 'completed').length,
  }

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const openConfirm = (booking) => {
    setSelected(booking)
    setForm({ total: booking.total || '', deposit: booking.deposit || '' })
    setModalOpen(true)
  }

  const openDetail = (booking) => {
    setSelected(booking)
    setDetailOpen(true)
  }

const saveConfirm = async () => {
    if (!form.total || !form.deposit) {
      showToast('Please enter both amounts')
      return
    }
    try {
      const res = await fetch(`http://localhost:4001/bookings/${selected.ref}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'confirmed',
          total: Number(form.total),
          deposit: Number(form.deposit),
        }),
      })
      if (!res.ok) throw new Error('Update failed')

      await fetchBookings()
      setModalOpen(false)
      showToast(`${selected.ref} confirmed! Deposit link ready.`)
    } catch (err) {
      showToast('Failed to confirm booking. Check your connection.')
      console.error(err)
    }
  }

  const updateStatus = async (ref, status) => {
    try {
      const res = await fetch(`http://localhost:4001/bookings/${ref}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error('Update failed')

      await fetchBookings()
      showToast(`Status updated to ${statusLabels[status]}`)
    } catch (err) {
      showToast('Failed to update status. Check your connection.')
      console.error(err)
    }
  }

  const copyLink = (ref) => {
    const link = `kallenvisuals.com/deposit/${ref}`
    navigator.clipboard?.writeText(link).catch(() => {})
    showToast(`Link copied: ${link}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 -mt-[68px] pt-[68px] flex flex-col md:flex-row">

      {/* SIDEBAR */}
      <div className="bg-[#1A1A2E] md:w-56 flex md:flex-col">
        <div className="hidden md:block p-6 border-b border-white/10">
          <p className="font-serif text-white text-lg">Kallen Visuals</p>
          <p className="text-[10px] text-[#C9A96E] tracking-widest uppercase mt-1">Admin</p>
        </div>
        {['dashboard', 'bookings', 'deposits'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-6 py-3 text-sm text-left capitalize ${tab === t ? 'bg-white/10 text-white border-l-2 border-[#C9A96E]' : 'text-white/60'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6 md:p-10 overflow-x-auto">

        {/* DASHBOARD TAB */}
        {tab === 'dashboard' && (
          <>
            <h2 className="font-serif text-2xl text-[#1A1A2E] mb-6">Dashboard</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Kpi label="Total Bookings" value={counts.total} />
              <Kpi label="Pending" value={counts.pending} />
              <Kpi label="Confirmed" value={counts.confirmed} />
              <Kpi label="Completed" value={counts.completed} />
            </div>
            <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-semibold text-[#1A1A2E]">Recent Bookings</h3>
                <button onClick={() => setTab('bookings')} className="text-xs text-[#C9A96E] hover:underline">View All</button>
              </div>
              <BookingsTable
                bookings={bookings.slice(0, 4)}
                onConfirm={openConfirm}
                onCopyLink={copyLink}
                onView={openDetail}
                onStatusChange={updateStatus}
                compact
              />
            </div>
          </>
        )}

        {/* BOOKINGS TAB */}
        {tab === 'bookings' && (
          <>
            <h2 className="font-serif text-2xl text-[#1A1A2E] mb-6">All Bookings</h2>
            <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
              <BookingsTable
                bookings={bookings}
                onConfirm={openConfirm}
                onCopyLink={copyLink}
                onView={openDetail}
                onStatusChange={updateStatus}
              />
            </div>
          </>
        )}

        {/* DEPOSITS TAB */}
        {tab === 'deposits' && (
          <>
            <h2 className="font-serif text-2xl text-[#1A1A2E] mb-6">Deposit Tracking</h2>
            <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left text-xs text-gray-500 uppercase tracking-wide">
                    <th className="px-4 py-3">Reference</th>
                    <th className="px-4 py-3">Client</th>
                    <th className="px-4 py-3">Package</th>
                    <th className="px-4 py-3">Total</th>
                    <th className="px-4 py-3">Deposit</th>
                    <th className="px-4 py-3">Balance</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.filter((b) => b.status !== 'pending').map((b) => (
                    <tr key={b.ref} className="border-t border-gray-100">
                      <td className="px-4 py-3 font-medium text-[#1A1A2E]">{b.ref}</td>
                      <td className="px-4 py-3">{b.name}</td>
                      <td className="px-4 py-3">{b.package}</td>
                      <td className="px-4 py-3">₦{b.total.toLocaleString()}</td>
                      <td className="px-4 py-3 text-[#C9A96E] font-medium">₦{b.deposit.toLocaleString()}</td>
                      <td className="px-4 py-3">₦{(b.total - b.deposit).toLocaleString()}</td>
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
          </>
        )}
      </div>

      {/* CONFIRM MODAL */}
      {modalOpen && selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-8 w-full max-w-md">
            <h3 className="font-serif text-xl text-[#1A1A2E] mb-6">
              Confirm Booking — {selected.ref}
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#1A1A2E] mb-2">
                Agreed Total Amount (₦)
              </label>
              <input
                type="number"
                value={form.total}
                onChange={(e) => setForm({ ...form, total: e.target.value })}
                className="input"
                placeholder="e.g. 250000"
              />
              <p className="text-xs text-gray-400 mt-1">
                Enter negotiated price if different from package price
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#1A1A2E] mb-2">
                Agreed Deposit Amount (₦)
              </label>
              <input
                type="number"
                value={form.deposit}
                onChange={(e) => setForm({ ...form, deposit: e.target.value })}
                className="input"
                placeholder="e.g. 100000"
              />
            </div>
            {form.total && form.deposit && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4 text-sm">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-500">Total</span>
                  <span className="font-medium">₦{Number(form.total).toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-500">Deposit</span>
                  <span className="text-[#C9A96E] font-medium">₦{Number(form.deposit).toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-1 mt-1">
                  <span className="text-gray-500">Balance Due</span>
                  <span className="font-semibold text-[#1A1A2E]">₦{(Number(form.total) - Number(form.deposit)).toLocaleString()}</span>
                </div>
              </div>
            )}
            <div className="bg-gray-50 rounded-lg p-3 mb-6 text-xs text-gray-500 font-mono">
              Deposit link: kallenvisuals.com/deposit/{selected.ref}
            </div>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setModalOpen(false)} className="px-4 py-2 border border-gray-200 rounded text-sm text-gray-500">Cancel</button>
              <button onClick={saveConfirm} className="px-6 py-2 bg-[#1A1A2E] text-white rounded text-sm font-medium hover:bg-[#C9A96E] hover:text-[#1A1A2E] transition">Confirm & Generate Link</button>
            </div>
          </div>
        </div>
      )}

      {/* DETAIL MODAL */}
      {detailOpen && selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-8 w-full max-w-md">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-xs text-[#C9A96E] tracking-widest uppercase">{selected.ref}</p>
                <h3 className="font-serif text-xl text-[#1A1A2E] mt-1">{selected.name}</h3>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[selected.status]}`}>
                {statusLabels[selected.status]}
              </span>
            </div>
            <div className="space-y-3 text-sm mb-6">
              <Row label="Phone" value={selected.phone} />
              <Row label="Event" value={selected.event} />
              <Row label="Date" value={new Date(selected.date).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })} />
              <Row label="Location" value={selected.location} />
              <Row label="Package" value={selected.package} />
              {selected.total > 0 && <Row label="Total" value={`₦${selected.total.toLocaleString()}`} />}
              {selected.deposit > 0 && <Row label="Deposit" value={`₦${selected.deposit.toLocaleString()}`} />}
              {selected.total > 0 && selected.deposit > 0 && (
                <Row label="Balance" value={`₦${(selected.total - selected.deposit).toLocaleString()}`} />
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#1A1A2E] mb-2">Update Status</label>
              <select
                value={selected.status}
                onChange={(e) => {
                  updateStatus(selected.ref, e.target.value)
                  setSelected({ ...selected, status: e.target.value })
                }}
                className="input"
              >
                {allStatuses.map((s) => (
                  <option key={s} value={s}>{statusLabels[s]}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDetailOpen(false)} className="px-4 py-2 border border-gray-200 rounded text-sm text-gray-500">Close</button>
              {selected.status === 'confirmed' && (
                <button onClick={() => { copyLink(selected.ref); setDetailOpen(false) }} className="px-6 py-2 bg-[#C9A96E] text-[#1A1A2E] rounded text-sm font-medium">Copy Deposit Link</button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#1A1A2E] text-white px-6 py-3 rounded-lg text-sm border-l-4 border-[#C9A96E] z-50">
          {toast}
        </div>
      )}
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

function BookingsTable({ bookings, onConfirm, onCopyLink, onView, onStatusChange, compact }) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-gray-50 text-left text-xs text-gray-500 uppercase tracking-wide">
          <th className="px-4 py-3">Reference</th>
          <th className="px-4 py-3">Client</th>
          <th className="px-4 py-3">Event</th>
          <th className="px-4 py-3">Date</th>
          {!compact && <th className="px-4 py-3">Package</th>}
          <th className="px-4 py-3">Status</th>
          <th className="px-4 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((b) => (
          <tr key={b.ref} className="border-t border-gray-100 hover:bg-gray-50">
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
            <td className="px-4 py-3">
              <div className="flex gap-2 flex-wrap">
                {b.status === 'pending' && (
                  <button onClick={() => onConfirm(b)} className="px-3 py-1 bg-[#C9A96E] text-[#1A1A2E] rounded text-xs font-medium">Confirm</button>
                )}
                {b.status === 'confirmed' && (
                  <button onClick={() => onCopyLink(b.ref)} className="px-3 py-1 bg-[#C9A96E] text-[#1A1A2E] rounded text-xs font-medium">Copy Link</button>
                )}
                <button onClick={() => onView(b)} className="px-3 py-1 border border-gray-200 text-[#1A1A2E] rounded text-xs font-medium hover:bg-gray-50">View</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
      <span className="text-gray-500">{label}</span>
      <span className="text-[#1A1A2E] font-medium">{value}</span>
    </div>
  )
}
