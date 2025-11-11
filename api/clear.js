// api/clear.js
const { Redis } = require('@upstash/redis');

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

module.exports = async (req, res) => {
    // Only allow DELETE requests
    if (req.method !== 'DELETE') {
        return res.status(405).json({ error: 'Method not allowed. Use DELETE.' });
    }

    try {
        // Delete all data from Upstash Redis
        await redis.del('webhook-data');

        // Send success response
        res.status(200).json({
            success: true,
            message: 'All data cleared successfully'
        });

    } catch (error) {
        console.error('Error clearing data:', error);
        res.status(500).json({
            success: false,
            error: 'Error clearing data',
            details: error.message
        });
    }
};