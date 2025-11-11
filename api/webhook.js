// api/webhook.js
const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed. Use POST.' });
    }

    try {
        // Get the data from the request body
        const incomingData = req.body;

        // Add timestamp to the data
        const dataWithTimestamp = {
            ...incomingData,
            receivedAt: new Date().toISOString()
        };

        // Path to store data (in /tmp for Vercel)
        const dataPath = '/tmp/webhook-data.json';

        // Read existing data or create empty array
        let allData = [];
        if (fs.existsSync(dataPath)) {
            const fileContent = fs.readFileSync(dataPath, 'utf8');
            allData = JSON.parse(fileContent);
        }

        // Add new data
        allData.push(dataWithTimestamp);

        // Keep only last 100 entries to avoid file getting too large
        if (allData.length > 100) {
            allData = allData.slice(-100);
        }

        // Save back to file
        fs.writeFileSync(dataPath, JSON.stringify(allData, null, 2));

        // Send success response
        res.status(200).json({
            success: true,
            message: 'Data saved successfully',
            totalEntries: allData.length
        });

    } catch (error) {
        console.error('Error processing webhook:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};