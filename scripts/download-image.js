/**
 * Download a single image from a URL and save it with a specific filename.
 * Usage: node scripts/download-image.js <url> <filename>
 * Example: node scripts/download-image.js "https://..." "suspension.jpg"
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const imagesDir = path.join(__dirname, '..', 'public', 'images');
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }

    const filePath = path.join(imagesDir, filename);
    const file = fs.createWriteStream(filePath);

    const protocol = url.startsWith('https') ? https : http;

    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirects
        return downloadImage(response.headers.location, filename)
          .then(resolve)
          .catch(reject);
      }

      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }

      response.pipe(file);

      file.on('finish', () => {
        file.close();
        const stats = fs.statSync(filePath);
        console.log(`✓ Downloaded: ${filename} (${(stats.size / 1024).toFixed(1)} KB)`);
        resolve(filePath);
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {}); // Delete the file on error
      reject(err);
    });
  });
}

// Command line usage
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log('Usage: node scripts/download-image.js <url> <filename>');
    console.log('Example: node scripts/download-image.js "https://..." "suspension.jpg"');
    process.exit(1);
  }

  const [url, filename] = args;
  
  if (!filename.match(/\.(jpg|jpeg|png)$/i)) {
    console.log('Warning: Filename should end with .jpg, .jpeg, or .png');
  }

  downloadImage(url, filename)
    .then(() => {
      console.log('✓ Image saved successfully!');
    })
    .catch((err) => {
      console.error('✗ Error:', err.message);
      process.exit(1);
    });
}

module.exports = { downloadImage };

