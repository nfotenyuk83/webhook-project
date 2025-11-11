// api/webhook.js
const { Redis } = require('@upstash/redis');

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

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

        // Read existing data from Upstash Redis
        let allData = await redis.get('webhook-data') || [];

        // Add new data
        allData.push(dataWithTimestamp);

        // Keep only last 100 entries to avoid storage getting too large
        if (allData.length > 100) {
            allData = allData.slice(-100);
        }

        // Save back to Upstash Redis
        await redis.set('webhook-data', allData);

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
            error: 'Internal server error',
            details: error.message
        });
    }
};