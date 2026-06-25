require('dotenv').config()
const express = require('express')
const cors = require('cors')
const AWS = require('aws-sdk')

const app = express()
const PORT = 4001

app.use(cors())
app.use(express.json())

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

const dynamodb = new AWS.DynamoDB.DocumentClient()
const TABLE_NAME = 'Kallen-Visuals-Booking'

function generateReference(seq) {
  const now = new Date()
  const yy = String(now.getFullYear()).slice(-2)
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  return `KV-${yy}${mm}-${String(seq).padStart(3, '0')}`
}

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Kallen Visuals booking-service is running' })
})

// Create a new booking
app.post('/bookings', async (req, res) => {
  try {
    const { name, phone, email, eventType, weddingTiming, date, eventLocation, package: pkg, notes } = req.body

    if (!name || !phone || !eventType || !date || !eventLocation) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Count existing bookings this month to generate sequence
    const scanResult = await dynamodb.scan({ TableName: TABLE_NAME }).promise()
    const seq = scanResult.Items.length + 1

    const newBooking = {
      ref: generateReference(seq),
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

await dynamodb.put({
TableName: TABLE_NAME,
Item: newBooking
}).promise()

console.log('New booking saved to DynamoDB:', newBooking.ref)

await fetch('http://localhost:4004/notify', {
method: 'POST',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify({
message:
`📸 NEW BOOKING

Ref: ${newBooking.ref}
Name: ${newBooking.name}
Phone: ${newBooking.phone}
Event: ${newBooking.eventType}
Date: ${newBooking.date}
Location: ${newBooking.eventLocation}
Package: ${newBooking.package}`
})
})

    res.status(201).json(newBooking)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to create booking' })
  }
})

// Get all bookings
app.get('/bookings', async (req, res) => {
  try {
    const result = await dynamodb.scan({ TableName: TABLE_NAME }).promise()
    res.json(result.Items)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch bookings' })
  }
})

// Get a single booking by reference
app.get('/bookings/:ref', async (req, res) => {
  try {
    const result = await dynamodb.get({ TableName: TABLE_NAME, Key: { ref: req.params.ref } }).promise()
    if (!result.Item) {
      return res.status(404).json({ error: 'Booking not found' })
    }
    res.json(result.Item)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch booking' })
  }
})

// Update a booking
app.put('/bookings/:ref', async (req, res) => {
  try {
    const existing = await dynamodb.get({ TableName: TABLE_NAME, Key: { ref: req.params.ref } }).promise()
    if (!existing.Item) {
      return res.status(404).json({ error: 'Booking not found' })
    }

    const { status, total, deposit } = req.body
    const updated = {
      ...existing.Item,
      ...(status !== undefined && { status }),
      ...(total !== undefined && { total }),
      ...(deposit !== undefined && { deposit }),
    }

    await dynamodb.put({ TableName: TABLE_NAME, Item: updated }).promise()
    console.log(`Booking ${updated.ref} updated in DynamoDB`)

    res.json(updated)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to update booking' })
  }
})

app.listen(PORT, () => {
  console.log(`booking-service running on http://localhost:${PORT}`)
})
