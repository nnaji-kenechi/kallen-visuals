const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 4001

app.use(cors())
app.use(express.json())

// Temporary in-memory storage (will be replaced with DynamoDB)
let bookings = []
let counter = 1

function generateReference() {
  const now = new Date()
  const yy = String(now.getFullYear()).slice(-2)
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const seq = String(counter).padStart(3, '0')
  counter++
  return `KV-${yy}${mm}-${seq}`
}

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Kallen Visuals booking-service is running' })
})

// Create a new booking
app.post('/bookings', (req, res) => {
  const { name, phone, email, eventType, weddingTiming, date, eventLocation, package: pkg, notes } = req.body

  if (!name || !phone || !eventType || !date || !eventLocation) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const newBooking = {
    ref: generateReference(),
    name,
    phone,
    email: email || '',
    eventType,
    weddingTiming: weddingTiming || '',
    date,
    eventLocation,
    package: pkg || 'Not specified',
    notes: notes || '',
    status: 'pending',
    total: 0,
    deposit: 0,
    createdAt: new Date().toISOString(),
  }

  bookings.push(newBooking)
  console.log('New booking received:', newBooking.ref)

  res.status(201).json(newBooking)
})

// Get all bookings
app.get('/bookings', (req, res) => {
  res.json(bookings)
})

// Get a single booking by reference
app.get('/bookings/:ref', (req, res) => {
  const booking = bookings.find((b) => b.ref === req.params.ref)
  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' })
  }
  res.json(booking)
})

app.listen(PORT, () => {
  console.log(`booking-service running on http://localhost:${PORT}`)
})
