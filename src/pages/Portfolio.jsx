import { useState } from 'react'

const categories = ['All Events', 'Weddings', 'Burials', 'Corporate', 'Other']

const items = [
  { cat: 'Weddings', label: 'Wedding Ceremony' },
  { cat: 'Weddings', label: 'Traditional Wedding' },
  { cat: 'Weddings', label: 'Couple Portrait' },
  { cat: 'Weddings', label: 'Reception Dance' },
  { cat: 'Burials', label: 'Burial Ceremony' },
  { cat: 'Burials', label: 'Remembrance Event' },
  { cat: 'Corporate', label: 'Book Launch' },
  { cat: 'Corporate', label: 'Corporate Dinner' },
  { cat: 'Corporate', label: 'Conference' },
  { cat: 'Other', label: 'Coronation' },
  { cat: 'Other', label: 'Birthday Party' },
  { cat: 'Other', label: 'Engagement' },
]

export default function Portfolio() {
  const [active, setActive] = useState('All Events')

  const filtered = active === 'All Events'
    ? items
    : items.filter((i) => i.cat === active)

  return (
    <div className="py-16 px-6 max-w-6xl mx-auto">
      <div className="mb-10">
        <h2 className="font-serif text-3xl text-[#1A1A2E] mb-2">Our Work</h2>
        <div className="w-10 h-0.5 bg-[#C9A96E] mb-3"></div>
        <p className="text-gray-500 text-sm">A glimpse into the events we've had the privilege of covering.</p>
      </div>

      <div className="flex gap-3 flex-wrap mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-5 py-2 rounded-full text-sm border transition ${
              active === cat
                ? 'bg-[#1A1A2E] text-white border-[#1A1A2E]'
                : 'bg-white text-gray-500 border-gray-200 hover:border-[#1A1A2E]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map((item, i) => (
          <div
            key={i}
            className="relative aspect-[4/3] bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center group overflow-hidden"
          >
            <span className="text-gray-300 text-sm">Photo slot</span>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1A1A2E]/85 to-transparent p-3 opacity-0 group-hover:opacity-100 transition">
              <span className="text-white text-sm font-medium">{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
