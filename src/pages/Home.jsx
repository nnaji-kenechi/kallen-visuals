import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="bg-[#1A1A2E] py-24 px-6 text-center">
        <p className="text-[#C9A96E] text-xs tracking-widest uppercase mb-4">
          Professional Event Coverage
        </p>
        <h1 className="font-serif text-4xl md:text-5xl text-white font-bold leading-tight mb-4">
          Creating Timeless Memories
        </h1>
        <p className="text-gray-300 max-w-md mx-auto mb-8">
          Professional event photography and videography across Nigeria — weddings,
          burials, corporate events, and every ceremony in between.
        </p>
        <Link
          to="/booking"
          className="bg-[#C9A96E] text-[#1A1A2E] px-8 py-3 rounded font-semibold hover:bg-[#E8D5A3] transition inline-block"
        >
          Book Now
        </Link>
      </section>

      {/* SERVICES */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="font-serif text-3xl text-[#1A1A2E] mb-2">What We Cover</h2>
          <div className="w-10 h-0.5 bg-[#C9A96E]"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Weddings', desc: 'Full wedding day coverage, introduction ceremonies, and pre-wedding shoots.' },
            { title: 'Burials & Remembrance', desc: 'Respectful, dignified coverage of burial and remembrance ceremonies.' },
            { title: 'Corporate Events', desc: 'Book launches, conferences, and brand activations.' },
            { title: 'Other Ceremonies', desc: 'Coronations, birthdays, dedications, engagements, and more.' },
          ].map((s) => (
            <div key={s.title} className="border border-gray-200 rounded-lg p-6 hover:border-[#C9A96E] hover:shadow-lg transition">
              <div className="w-12 h-12 bg-[#1A1A2E] rounded-lg mb-4"></div>
              <h3 className="font-semibold text-[#1A1A2E] mb-2">{s.title}</h3>
              <p className="text-sm text-gray-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="font-serif text-3xl text-[#1A1A2E] mb-2">How Booking Works</h2>
          <div className="w-10 h-0.5 bg-[#C9A96E] mx-auto"></div>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { step: '1', title: 'Send an Enquiry', desc: 'Fill our booking form with your event details.' },
            { step: '2', title: 'We Confirm', desc: 'We reach out via WhatsApp to confirm availability.' },
            { step: '3', title: 'Pay Deposit', desc: 'Agree on a deposit, upload your proof of payment.' },
            { step: '4', title: 'We Show Up', desc: 'We arrive early and capture every moment.' },
          ].map((s) => (
            <div key={s.step}>
              <div className="w-11 h-11 bg-[#C9A96E] text-[#1A1A2E] rounded-full flex items-center justify-center font-serif font-bold mx-auto mb-3">
                {s.step}
              </div>
              <h4 className="font-semibold text-[#1A1A2E] mb-1">{s.title}</h4>
              <p className="text-sm text-gray-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
