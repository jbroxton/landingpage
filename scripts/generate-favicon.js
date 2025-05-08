const fs = require('fs');
const path = require('path');
const { readFile, writeFile, mkdir } = require('fs/promises');
const sharp = require('sharp');

async function generateFavicons() {
  try {
    // Create favicons directory if it doesn't exist
    const faviconDir = path.join(__dirname, '../public');
    try {
      await mkdir(faviconDir, { recursive: true });
    } catch (err) {
      if (err.code !== 'EEXIST') throw err;
    }

    // Read the SVG file
    const svgPath = path.join(__dirname, '../public/favicon.svg');
    const svgBuffer = await readFile(svgPath);

    // Generate different sizes of PNG icons
    const sizes = [16, 32, 48, 128, 180, 192, 512];
    
    for (const size of sizes) {
      const outputName = size === 180 ? 'apple-touch-icon.png' : `favicon-${size}x${size}.png`;
      const outputPath = path.join(faviconDir, outputName);
      
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(outputPath);
      
      console.log(`Generated ${outputPath}`);
    }

    // Generate favicon.ico as a 32x32 PNG
    // Note: We're using .png format with .ico extension
    // For a proper multi-size .ico file, we would need an ico converter library
    await sharp(svgBuffer)
      .resize(32, 32)
      .png()
      .toFile(path.join(faviconDir, 'favicon.ico.png'));
      
    // Rename the file to .ico
    fs.renameSync(
      path.join(faviconDir, 'favicon.ico.png'),
      path.join(faviconDir, 'favicon.ico')
    );

    console.log('Generated favicon.ico');
    console.log('All favicons generated successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

generateFavicons();