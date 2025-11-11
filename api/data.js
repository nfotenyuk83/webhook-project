// api/data.js
const fs = require('fs');

module.exports = async (req, res) => {
    try {
        const dataPath = '/tmp/webhook-data.json';

        // Check if file exists
        if (!fs.existsSync(dataPath)) {
            return res.status(200).json({
                data: [],
                message: 'No data received yet'
            });
        }

        // Read and return the data
        const fileContent = fs.readFileSync(dataPath, 'utf8');
        const data = JSON.parse(fileContent);

        res.status(200).json({
            data: data,
            totalEntries: data.length,
            lastUpdated: data.length > 0 ? data[data.length - 1].receivedAt : null
        });

    } catch (error) {
        console.error('Error reading data:', error);
        res.status(500).json({
            error: 'Error reading data'
        });
    }
};