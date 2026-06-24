require('dotenv').config()
const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const app = express()
const PORT = 4004

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Kallen Visuals auth-service is running' })
})

// Admin login
app.post('/login', (req, res) => {
  const { username, password } = req.body

  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign(
      { username, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )
    return res.json({ success: true, token })
  }

  res.status(401).json({ success: false, error: 'Invalid username or password' })
})

// Verify token (used to protect admin routes later)
app.post('/verify', (req, res) => {
  const { token } = req.body

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    res.json({ valid: true, decoded })
  } catch (err) {
    res.status(401).json({ valid: false, error: 'Invalid or expired token' })
  }
})

app.listen(PORT, () => {
  console.log(`auth-service running on http://localhost:${PORT}`)
})
