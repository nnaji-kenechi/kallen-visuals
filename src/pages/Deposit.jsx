import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function Deposit() {
  const { ref } = useParams()
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState(false)

  useEffect(() => {
    fetch(`http://localhost:4001/bookings/${ref}`)
      .then((res) => {
        if (!res.ok) throw new Error('Booking not found')
        return res.json()
      })
      .then((data) => setBooking(data))
      .catch((err) => {
        console.error(err)
        setError(true)
      })
      .finally(() => setLoading(false))
  }, [ref])

  const handleUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch(`http://localhost:4002/upload/deposit/${ref}`, {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) throw new Error('Upload failed')

      const data = await res.json()
      console.log('Uploaded:', data.url)
      setUploaded(true)
    } catch (err) {
      alert('Upload failed. Please check your connection and try again.')
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  if (loading) {
    return <div className="py-24 text-center text-gray-400 text-sm">Loading booking...</div>
  }

  if (error || !booking) {
    return (
      <div className="py-24 text-center max-w-md mx-auto px-6">
        <p className="text-gray-500 text-sm mb-4">We couldn't find this booking. Please check the link or contact us on WhatsApp.</p>
        <a href="https://wa.me/2348110132427" target="_blank" rel="noreferrer" className="text-[#C9A96E] font-medium hover:underline">
          Chat with us →
        </a>
      </div>
    )
  }

  const balance = (booking.total || 0) - (booking.deposit || 0)

  return (
    <div className="py-16 px-6 max-w-xl mx-auto">
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 mb-8">
        <p className="text-xs text-[#C9A96E] tracking-widest uppercase mb-1">{booking.ref}</p>
        <h2 className="font-serif text-2xl text-[#1A1A2E] mb-6">{booking.name}'s Booking</h2>

        <Row label="Event" value={booking.eventType} />
        <Row label="Date" value={new Date(booking.date).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })} />
        <Row label="Package" value={booking.package} />
        <Row label="Total Amount" value={`₦${(booking.total || 0).toLocaleString()}`} />
        <Row label="Deposit Due" value={`₦${(booking.deposit || 0).toLocaleString()}`} highlight />
        <Row label="Balance After Deposit" value={`₦${balance.toLocaleString()}`} bold last />
      </div>

      <div className="bg-[#1A1A2E] text-white rounded-lg p-6 mb-8">
        <h3 className="text-xs text-[#C9A96E] tracking-widest uppercase mb-4">Payment Details</h3>
        <Row label="Bank" value="UBA" dark />
        <Row label="Account Name" value="Nnaji Kenechi Anthony" dark />
        <Row label="Account Number" value="2065025646" dark last />
      </div>

      <div className="bg-[#25D366] rounded-lg p-6 mb-6 text-center">
        <h3 className="font-semibold text-white mb-2">Send Your Proof of Payment</h3>
        <p className="text-white/90 text-sm mb-4">
          The fastest way — just send us a screenshot of your transfer on WhatsApp.
        </p>
        <a
          href={`https://wa.me/2348110132427?text=${encodeURIComponent(`Hi, I just made a deposit for booking ${booking.ref}. Sending my proof of payment now.`)}`}
          target="_blank"
          rel="noreferrer"
          className="bg-white text-[#1A1A2E] px-6 py-3 rounded font-semibold inline-block hover:bg-gray-100 transition"
        >
          Send on WhatsApp
        </a>
      </div>

      <div className="text-center text-gray-400 text-xs mb-6">— or —</div>

      <h3 className="font-medium text-gray-600 mb-4 text-sm">Upload it here instead</h3>
      <label className={`block border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${uploaded ? 'border-green-300 bg-green-50' : 'border-gray-200 hover:border-[#C9A96E]'}`}>
        {uploaded ? (
          <>
            <svg className="mx-auto mb-3 text-green-600" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <p className="text-sm text-green-700 font-medium">File uploaded successfully!</p>
          </>
        ) : (
          <>
            <svg className="mx-auto mb-3 text-gray-400" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <p className="text-sm text-gray-500">
              <strong className="text-[#1A1A2E]">{uploading ? 'Uploading...' : 'Tap to upload'}</strong> your payment proof
            </p>
            <p className="text-xs text-gray-400 mt-1">JPG, PNG or PDF accepted</p>
          </>
        )}
        <input type="file" accept="image/*,.pdf" className="hidden" onChange={handleUpload} disabled={uploading} />
      </label>
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
