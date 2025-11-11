// api/data.js
const { Redis } = require('@upstash/redis');

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

module.exports = async (req, res) => {
    try {
        // Read data from Upstash Redis
        const data = await redis.get('webhook-data') || [];

        res.status(200).json({
            data: data,
            totalEntries: data.length,
            lastUpdated: data.length > 0 ? data[data.length - 1].receivedAt : null
        });

    } catch (error) {
        console.error('Error reading data:', error);
        res.status(500).json({
            error: 'Error reading data',
            details: error.message
        });
    }
};