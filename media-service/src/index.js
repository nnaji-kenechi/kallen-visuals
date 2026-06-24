require('dotenv').config()
const express = require('express')
const cors = require('cors')
const multer = require('multer')
const AWS = require('aws-sdk')

const app = express()
const PORT = 4002

app.use(cors())
app.use(express.json())

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

const s3 = new AWS.S3()
const BUCKET = process.env.S3_BUCKET_NAME

// Store uploaded files in memory temporarily before sending to S3
const upload = multer({ storage: multer.memoryStorage() })

app.get('/', (req, res) => {
  res.json({ message: 'Kallen Visuals media-service is running' })
})

// Upload deposit proof
app.post('/upload/deposit/:ref', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const ref = req.params.ref
    const key = `deposits/${ref}/${Date.now()}-${req.file.originalname}`

    await s3.putObject({
      Bucket: BUCKET,
      Key: key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    }).promise()

    const fileUrl = `https://${BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`

    console.log(`Deposit proof uploaded for ${ref}: ${key}`)
    res.json({ success: true, url: fileUrl, key })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Upload failed' })
  }
})

// Upload portfolio photo
app.post('/upload/portfolio', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const category = req.body.category || 'other'
    const label = req.body.label || 'Untitled'
    const key = `portfolio/${category}/${Date.now()}-${req.file.originalname}`

    await s3.putObject({
      Bucket: BUCKET,
      Key: key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    }).promise()

    const fileUrl = `https://${BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`

    console.log(`Portfolio photo uploaded: ${key}`)
    res.json({ success: true, url: fileUrl, key, category, label })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Upload failed' })
  }
})

// List all portfolio photos
app.get('/portfolio', async (req, res) => {
  try {
    const result = await s3.listObjectsV2({ Bucket: BUCKET, Prefix: 'portfolio/' }).promise()
    const items = result.Contents.map((obj) => {
      const parts = obj.Key.split('/')
      const category = parts[1]
      return {
        key: obj.Key,
        category,
        url: `https://${BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${obj.Key}`,
      }
    })
    res.json(items)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch portfolio' })
  }
})

// Delete a portfolio photo
app.delete('/portfolio', async (req, res) => {
  try {
    const { key } = req.body
    if (!key) {
      return res.status(400).json({ error: 'Missing key' })
    }

    await s3.deleteObject({ Bucket: BUCKET, Key: key }).promise()
    console.log(`Deleted: ${key}`)
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Delete failed' })
  }
})

app.listen(PORT, () => {
  console.log(`media-service running on http://localhost:${PORT}`)
})
