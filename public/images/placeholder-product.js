// This file will generate placeholder images for the application
const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Create directory if it doesn't exist
const imagesDir = path.join(__dirname, '..');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Function to create a placeholder image
function createPlaceholderImage(filename, width, height, bgColor, text) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Fill background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  // Add text
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 20px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width / 2, height / 2);

  // Save the image
  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(path.join(imagesDir, filename), buffer);
  console.log(`Created ${filename}`);
}

// Create placeholder images
createPlaceholderImage('vietnam-flag.png', 30, 20, '#ff0000', 'VN');
createPlaceholderImage('vnpay-logo.png', 100, 40, '#0066cc', 'VNPAY');
createPlaceholderImage('placeholder-bestseller1.jpg', 200, 200, '#3498db', 'Product 1');
createPlaceholderImage('placeholder-bestseller2.jpg', 200, 200, '#2ecc71', 'Product 2');
createPlaceholderImage('placeholder-bestseller3.jpg', 200, 200, '#e74c3c', 'Product 3');
createPlaceholderImage('placeholder-bestseller4.jpg', 200, 200, '#f39c12', 'Product 4');
createPlaceholderImage('placeholder-bestseller5.jpg', 200, 200, '#9b59b6', 'Product 5');
createPlaceholderImage('placeholder-product1.jpg', 300, 300, '#34495e', 'Product');

console.log('All placeholder images created successfully!');
