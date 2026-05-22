const fs = require('fs');
const path = require('path');
const geoip = require('fast-geoip');

async function main() {

    const filePath = path.join(__dirname, '../data/ips.txt');
    const outputPath = path.join(__dirname, '../output/report.txt');

    // Read IPs
    const rawData = fs.readFileSync(filePath, 'utf8');
    const ips = rawData.split('\n').map(ip => ip.trim()).filter(Boolean);

    const regionCount = {};

    console.log('\nProcessing IPs...\n');

    for (const ip of ips) {
        try {
            const geo = await geoip.lookup(ip);

            const region = geo?.country || 'Unknown';

            regionCount[region] = (regionCount[region] || 0) + 1;

            console.log(`${ip} → ${region}`);

        } catch (err) {
            regionCount['Unknown'] = (regionCount['Unknown'] || 0) + 1;
            console.log(`${ip} → Error`);
        }
    }

    // Build report
    let report = '\n=== IP Region Report ===\n\n';

    for (const [region, count] of Object.entries(regionCount)) {
        report += `${region}: ${count}\n`;
    }

    // Save file
    fs.writeFileSync(outputPath, report, 'utf8');

    console.log(report);
    console.log(`\nSaved to ${outputPath}`);
}

main();