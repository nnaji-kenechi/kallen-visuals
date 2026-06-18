import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function Booking() {
  const location = useLocation()
  const preselectedPackage = location.state?.package || ''

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: '',
    weddingTiming: '',
    date: '',
    eventLocation: '',
    package: preselectedPackage,
    notes: '',
  })

  useEffect(() => {
    if (preselectedPackage) {
      setForm((f) => ({ ...f, package: preselectedPackage }))
    }
  }, [preselectedPackage])

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

const generateReference = () => {
    const now = new Date()
    const yy = String(now.getFullYear()).slice(-2)
    const mm = String(now.getMonth() + 1).padStart(2, '0')
    const seq = String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')
    return `KV-${yy}${mm}-${seq}`
  }

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.eventType || !form.date || !form.eventLocation) {
      alert('Please fill in all required fields')
      return
    }
    const ref = generateReference()
    alert(`Booking request sent! Reference: ${ref}\nWe'll reach out on WhatsApp as soon as possible.`)
  }

  return (
    <div className="py-16 px-6 max-w-6xl mx-auto">
      <div className="mb-10">
        <h2 className="font-serif text-3xl text-[#1A1A2E] mb-2">Book a Session</h2>
        <div className="w-10 h-0.5 bg-[#C9A96E] mb-3"></div>
        <p className="text-gray-500 text-sm">Fill in your event details and we'll reach out via WhatsApp to confirm.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-start">
        {/* FORM */}
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Full Name *">
              <input value={form.name} onChange={update('name')} className="input" placeholder="Your full name" />
            </Field>
            <Field label="Phone Number *">
              <input value={form.phone} onChange={update('phone')} className="input" placeholder="08XXXXXXXXX" />
            </Field>
          </div>

          <Field label="Email Address">
            <input value={form.email} onChange={update('email')} className="input" placeholder="your@email.com" />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Event Type *">
              <select value={form.eventType} onChange={update('eventType')} className="input">
                <option value="">Select event type</option>
                <option>Wedding</option>
                <option>Burial / Remembrance</option>
                <option>Corporate Event</option>
                <option>Book Launch</option>
                <option>Coronation</option>
                <option>Birthday</option>
                <option>Engagement</option>
                <option>Child Dedication</option>
                <option>Other</option>
              </select>
            </Field>
            <Field label="Event Date *">
              <input type="date" value={form.date} onChange={update('date')} className="input" />
            </Field>
          </div>

          {form.eventType === 'Wedding' && (
            <Field label="Traditional & White Wedding">
              <select value={form.weddingTiming} onChange={update('weddingTiming')} className="input">
                <option value="">Select an option</option>
                <option>Same day</option>
                <option>Different days</option>
                <option>Only one ceremony</option>
              </select>
            </Field>
          )}

          <Field label="Event Location *">
            <input value={form.eventLocation} onChange={update('eventLocation')} className="input" placeholder="City, Venue name" />
          </Field>

          <Field label="Preferred Package">
            <select value={form.package} onChange={update('package')} className="input">
              <option value="">Select a package</option>
              <option>Tight Budget — ₦149,999</option>
              <option>Budget — ₦219,999</option>
              <option>Regular — ₦289,999</option>
              <option>Silver — ₦399,999</option>
              <option>Gold — ₦494,999</option>
              <option>Not sure yet (let's discuss)</option>
            </select>
          </Field>

          <Field label="Additional Notes">
            <textarea value={form.notes} onChange={update('notes')} className="input min-h-[100px]" placeholder="Any special requests, number of guests, specific shots you want..." />
          </Field>

          <button
            onClick={handleSubmit}
            className="w-full bg-[#C9A96E] text-[#1A1A2E] py-4 rounded font-semibold text-base hover:bg-[#1A1A2E] hover:text-white transition"
          >
            Send Booking Request
          </button>
        </div>

        {/* SUMMARY SIDEBAR */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 sticky top-[88px]">
          <h3 className="font-semibold text-[#1A1A2E] mb-4 pb-3 border-b border-gray-200">Your Booking Summary</h3>
          <SummaryRow label="Event Type" value={form.eventType} />
          {form.eventType === 'Wedding' && <SummaryRow label="Timing" value={form.weddingTiming} />}
          <SummaryRow label="Date" value={form.date} />
          <SummaryRow label="Location" value={form.eventLocation} />
          <SummaryRow label="Package" value={form.package} />

<div className="bg-[#25D366] text-white rounded-lg p-4 mt-4 text-sm leading-relaxed">
            We'll reach out on WhatsApp as soon as possible to confirm your date and walk you
            through the next steps.
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#1A1A2E] mb-2">{label}</label>
      {children}
    </div>
  )
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex justify-between py-2 border-b border-gray-200 text-sm last:border-b-0">
      <span className="text-gray-500">{label}</span>
      <span className="text-[#1A1A2E] font-medium text-right max-w-[55%]">{value || '—'}</span>
    </div>
  )
}
