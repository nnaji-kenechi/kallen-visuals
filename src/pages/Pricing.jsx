import { useNavigate } from 'react-router-dom'

const packages = [
  {
    tier: 'Tight Budget',
    price: '₦149,999',
    features: ['HD Video — Full event coverage', 'Soft Copy Pictures — Edited high-quality photos', 'Memory Card — to store your memories'],
  },
  {
    tier: 'Budget',
    price: '₦219,999',
    features: ['HD Video — Full event coverage', 'Soft Copy Pictures — Edited high-quality photos', 'Flash Drive — to store your memories', '1 Enlargement Frame (12 × 15)'],
  },
  {
    tier: 'Regular',
    price: '₦289,999',
    featured: true,
    features: ['Trailer Video — Short engaging recap', 'HD Video — Full event coverage', 'Soft Copy + Hard Copy Pictures', 'Flash Drive', '1 Enlargement Frame of Celebrant (16 × 20)'],
  },
  {
    tier: 'Silver',
    price: '₦399,999',
    features: ['Trailer Video', 'HD Video — Full event coverage', 'Drone Video Service', 'Soft Copy + Hard Copy Pictures', 'Customized Photobook', 'Flash Drive', '2 Enlargement Frames (16 × 20)'],
  },
  {
    tier: 'Gold',
    price: '₦494,999',
    features: ['Trailer Video', 'HD Video — Full event coverage', 'Drone Video Service', 'Soft Copy + Hard Copy Pictures', 'Signature Photo-Album', 'Anti-virus Flash Drive', '2 Enlargement Frames (16 × 20)', 'Free Pre-wedding Photoshoot'],
  },
]

export default function Pricing() {
  const navigate = useNavigate()

  const choose = (tier, price) => {
    navigate('/booking', { state: { package: `${tier} — ${price}` } })
  }

  return (
    <div className="py-16 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="font-serif text-3xl text-[#1A1A2E] mb-2">Our Packages</h2>
        <div className="w-10 h-0.5 bg-[#C9A96E] mx-auto mb-3"></div>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          Transparent pricing for every budget. All packages cover a single event day.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.tier}
            className={`relative bg-white border rounded-lg p-8 flex flex-col ${
              pkg.featured ? 'border-[#C9A96E] shadow-lg' : 'border-gray-200'
            }`}
          >
            {pkg.featured && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C9A96E] text-[#1A1A2E] text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                Most Popular
              </span>
            )}
            <p className="text-xs font-semibold tracking-widest uppercase text-[#C9A96E] mb-2">{pkg.tier}</p>
            <p className="font-serif text-2xl font-bold text-[#1A1A2E] mb-6">{pkg.price}</p>
            <ul className="flex-1 space-y-3 mb-6">
              {pkg.features.map((f) => (
                <li key={f} className="flex gap-2 text-sm text-gray-700">
                  <span className="text-green-600">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => choose(pkg.tier, pkg.price)}
              className="bg-[#C9A96E] text-[#1A1A2E] py-3 rounded font-semibold hover:bg-[#1A1A2E] hover:text-white transition"
            >
              Choose Package
            </button>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 border-l-4 border-[#C9A96E] rounded-lg p-6 mt-10 max-w-3xl mx-auto">
        <h4 className="font-semibold text-[#1A1A2E] mb-2">For Wedding Bookings</h4>
        <p className="text-sm text-gray-500 leading-relaxed">
          All packages are designed for a single event day. If your traditional and white wedding
          take place on the same day, one package covers both beautifully. If celebrated on
          separate days, we're happy to discuss a package for each day.
        </p>
      </div>

      <div className="bg-gray-50 border-l-4 border-[#C9A96E] rounded-lg p-6 mt-6 max-w-3xl mx-auto">
        <h4 className="font-semibold text-[#1A1A2E] mb-2">Flexible & Negotiable</h4>
        <p className="text-sm text-gray-500 leading-relaxed">
          Birthdays, child dedications, engagements, bachelor parties, coronations, and other social
          events are all open to negotiation. Events outside the state will vary by location.
          Our staff's food and accommodation will also be provided by the client.
        </p>
      </div>
    </div>
  )
}
