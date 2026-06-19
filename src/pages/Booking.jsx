import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function Booking() {
  const location = useLocation()
  const preselectedPackage = location.state?.package || ''

const [form, setForm] = useState(() => {
    const saved = localStorage.getItem('kallen_booking_draft')
    return saved ? JSON.parse(saved) : {
      name: '',
      phone: '',
      email: '',
      eventType: '',
      weddingTiming: '',
      date: '',
      eventLocation: '',
      package: preselectedPackage,
      notes: '',
    }
  })

  useEffect(() => {
    localStorage.setItem('kallen_booking_draft', JSON.stringify(form))
  }, [form])

  useEffect(() => {
    if (preselectedPackage) {
      setForm((f) => ({ ...f, package: preselectedPackage }))
    }
  }, [preselectedPackage])

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })
const [submittedRef, setSubmittedRef] = useState(null)

const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.eventType || !form.date || !form.eventLocation) {
      alert('Please fill in all required fields')
      return
    }

    try {
      const res = await fetch('http://localhost:4001/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          eventType: form.eventType,
          weddingTiming: form.weddingTiming,
          date: form.date,
          eventLocation: form.eventLocation,
          package: form.package,
          notes: form.notes,
        }),
      })

      if (!res.ok) {
        throw new Error('Failed to submit booking')
      }

const data = await res.json()
      localStorage.removeItem('kallen_booking_draft')
      setSubmittedRef(data.ref)    } catch (err) {
      alert('Something went wrong. Please check your connection and try again.')
      console.error(err)
    }
  }

if (submittedRef) {
    return (
      <div className="py-24 px-6 max-w-lg mx-auto text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="font-serif text-2xl text-[#1A1A2E] mb-3">Booking Request Sent!</h2>
        <p className="text-gray-500 text-sm mb-4">We've received your enquiry. Your booking reference is:</p>
        <div className="inline-block bg-gray-50 border border-gray-200 rounded px-6 py-2 font-mono text-[#1A1A2E] mb-6">
          {submittedRef}
        </div>
        <p className="text-gray-500 text-sm mb-8">We'll reach out on WhatsApp as soon as possible to confirm your date.</p>
        <a
          href="https://wa.me/2348110132427"
          target="_blank"
          rel="noreferrer"
          className="bg-[#C9A96E] text-[#1A1A2E] px-6 py-3 rounded font-semibold inline-block hover:bg-[#1A1A2E] hover:text-white transition"
        >
          Chat on WhatsApp
        </a>
      </div>
    )
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
