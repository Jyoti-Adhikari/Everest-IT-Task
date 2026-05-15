const fs = require('fs');
const readline = require('readline');
const OpenCC = require('opencc-js');

// Converters
const toTraditional = OpenCC.Converter({ from: 'cn', to: 'hk' });
const toSimplified = OpenCC.Converter({ from: 'hk', to: 'cn' });

// Readline setup
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('\n=== Chinese Text Converter ===');
console.log('1. Simplified Chinese → Traditional Chinese');
console.log('2. Traditional Chinese → Simplified Chinese\n');

rl.question('Select conversion mode (1 or 2): ', (mode) => {

    if (mode === '1') {

        rl.question('\nEnter Simplified Chinese text:\n', (text) => {

            // Save original text
            fs.writeFileSync('simplified.txt', text, 'utf8');

            // Convert
            const converted = toTraditional(text);

            // Save converted text
            fs.writeFileSync('traditional.txt', converted, 'utf8');

            console.log('\nConversion successful!');
            console.log('Saved original text in: simplified.txt');
            console.log('Saved converted text in: traditional.txt');

            rl.close();
        });

    } 
    else if (mode === '2') {

        rl.question('\nEnter Traditional Chinese text:\n', (text) => {

            // Save original text
            fs.writeFileSync('traditional.txt', text, 'utf8');

            // Convert
            const converted = toSimplified(text);

            // Save converted text
            fs.writeFileSync('simplified.txt', converted, 'utf8');

            console.log('\nConversion successful!');
            console.log('Saved original text in: traditional.txt');
            console.log('Saved converted text in: simplified.txt');

            rl.close();
        });

    } 
    else {
        console.log('\nInvalid option selected.');
        rl.close();
    }
});