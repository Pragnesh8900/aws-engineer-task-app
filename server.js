const express = require('express');
const AWS = require('aws-sdk');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

// Route to serve the HTML page with the S3 image
app.get('/', (req, res) => {
  const imageUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${process.env.S3_IMAGE_KEY}`;
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve the image URL via an API endpoint for the HTML to use
app.get('/image-url', (req, res) => {
  const imageUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${process.env.S3_IMAGE_KEY}`;
  res.json({ imageUrl });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});