const express = require('express');
const fs = require('fs');
const geoip = require('fast-geoip');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/api/ips', async (req, res) => {

    const data = fs.readFileSync('./data/ips.txt', 'utf8');
    const ips = data.split('\n').map(i => i.trim()).filter(Boolean);

    const results = [];

    for (const ip of ips) {
        const geo = await geoip.lookup(ip);

        if (geo && geo.ll) {
            results.push({
                ip,
                country: geo.country,
                lat: geo.ll[0],
                lng: geo.ll[1]
            });
        }
    }

    res.json(results);
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});