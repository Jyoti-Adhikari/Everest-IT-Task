const fs = require('fs').promises;
const path = require('path');

async function validateJsonFile(filePath) {
  try {
    // Resolve full path for absolute accuracy
    const absolutePath = path.resolve(filePath);

    // Read file contents using UTF-8 encoding
    const fileContent = await fs.readFile(absolutePath, 'utf-8');

    // Strip potential Byte Order Mark (BOM) which can break JSON.parse
    const cleanContent = fileContent.trim().replace(/^\uFEFF/, '');

    if (!cleanContent) {
      return { isValid: false, error: 'File is empty.' };
    }

    // Attempt parsing
    const parsedData = JSON.parse(cleanContent);
    return { isValid: true, data: parsedData };

  } catch (error) {
    // Handle structural vs system errors (e.g., File not found vs Syntax Error)
    if (error.code === 'ENOENT') {
      return { isValid: false, error: 'File not found at target destination.' };
    }
    return { isValid: false, error: `Syntax Error: ${error.message}` };
  }
}

/**
 * Main execution function acting as the CLI Controller
 */
async function run() {
  // Grab the file path from CLI arguments: node json_validator.js <filename>
  const targetFile = process.argv[2];

  if (!targetFile) {
    console.error('\x1b[31m%s\x1b[0m', 'Error: Please provide a file path.');
    console.log('Usage: node json_validator.js <invalid.json>');
    process.exit(1);
  }

  console.log(`Analyzing file: ${targetFile}...`);
  const result = await validateJsonFile(targetFile);

  if (result.isValid) {
    console.log('\x1b[32m%s\x1b[0m', '✓ Success: The file contains valid JSON structure.');
    // Optional: Log preview of keys if it's an object
    if (typeof result.data === 'object' && result.data !== null) {
      console.log('Root keys detected:', Object.keys(result.data));
    }
  } else {
    console.error('\x1b[31m%s\x1b[0m', `✗ Validation Failed!`);
    console.error(`Reason: ${result.error}`);
    process.exit(1);
  }
}

// Execute the script
run();