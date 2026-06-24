import { useState, useEffect } from 'react'

const categories = ['All Events', 'Weddings', 'Burials', 'Corporate', 'Other']

const categoryMap = {
  'All Events': 'all',
  'Weddings': 'weddings',
  'Burials': 'burials',
  'Corporate': 'corporate',
  'Other': 'other',
}

export default function Portfolio() {
  const [active, setActive] = useState('All Events')
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:4002/portfolio')
      .then((res) => res.json())
      .then((data) => setPhotos(data))
      .catch((err) => console.error('Failed to load portfolio', err))
      .finally(() => setLoading(false))
  }, [])

  const filtered = active === 'All Events'
    ? photos
    : photos.filter((p) => p.category === categoryMap[active])

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

      {loading && <p className="text-gray-400 text-sm">Loading photos...</p>}

      {!loading && filtered.length === 0 && (
        <p className="text-gray-400 text-sm">No photos in this category yet.</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map((photo) => (
          <div
            key={photo.key}
            className="relative aspect-[4/3] bg-gray-50 border border-gray-200 rounded-lg overflow-hidden group"
          >
            <img src={photo.url} alt={photo.category} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1A1A2E]/85 to-transparent p-3 opacity-0 group-hover:opacity-100 transition">
              <span className="text-white text-sm font-medium capitalize">{photo.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
