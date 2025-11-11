# Webhook Project

A simple webhook backend that receives, stores, and serves data in real-time using Vercel and Upstash Redis.

## 🚀 Live URL

**Production:** https://webhook-project-tawny.vercel.app

## 📋 Features

- ✅ Receive webhook POST requests
- ✅ Store data permanently in Upstash Redis
- ✅ Publicly accessible data endpoint
- ✅ Automatic timestamps on all entries
- ✅ Data clearing mechanism
- ✅ Keeps last 100 entries automatically

## 🔗 API Endpoints

### 1. POST /webhook
Receive and store data via webhook.

**Request:**
```bash
curl -X POST https://webhook-project-tawny.vercel.app/webhook \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello World", "value": 123}'
```

**Response:**
```json
{
  "success": true,
  "message": "Data saved successfully",
  "totalEntries": 1
}
```

### 2. GET /data
Retrieve all stored data publicly.

**Request:**
```bash
curl https://webhook-project-tawny.vercel.app/data
```

Or simply visit in your browser:
```
https://webhook-project-tawny.vercel.app/data
```

**Response:**
```json
{
  "data": [
    {
      "message": "Hello World",
      "value": 123,
      "receivedAt": "2025-11-11T10:30:00.000Z"
    }
  ],
  "totalEntries": 1,
  "lastUpdated": "2025-11-11T10:30:00.000Z"
}
```

### 3. DELETE /clear
Clear all stored data.

**Request:**
```bash
curl -X DELETE https://webhook-project-tawny.vercel.app/clear
```

**Response:**
```json
{
  "success": true,
  "message": "All data cleared successfully"
}
```

## 🛠️ Tech Stack

- **Backend:** Node.js + Express
- **Storage:** Upstash Redis (free tier)
- **Hosting:** Vercel (serverless)
- **Version Control:** GitHub

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- Git
- GitHub account
- Vercel account
- Upstash account

### Local Development

1. **Clone the repository:**
```bash
git clone https://github.com/YOUR_USERNAME/webhook-project.git
cd webhook-project
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**

Create a `.env` file in the root directory:
```
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
```

Get these values from your Upstash dashboard.

4. **Run locally with Vercel CLI:**
```bash
npm install -g vercel
vercel dev
```

## 🚢 Deployment

### Deploy to Vercel

1. **Push to GitHub:**
```bash
git add .
git commit -m "Your commit message"
git push
```

2. **Deploy on Vercel:**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Click "Deploy"

3. **Connect Upstash:**
   - Go to [Upstash Console](https://console.upstash.com)
   - Create a Redis database
   - Connect it to your Vercel project
   - Redeploy on Vercel

## 📝 Project Structure

```
webhook-project/
├── api/
│   ├── webhook.js    # POST endpoint to receive data
│   ├── data.js       # GET endpoint to retrieve data
│   └── clear.js      # DELETE endpoint to clear data
├── vercel.json       # Vercel configuration
├── package.json      # Node.js dependencies
└── README.md         # This file
```

## 🔒 Security Notes

- The webhook endpoint is public and accepts any POST request
- Consider adding authentication for production use
- Data is limited to last 100 entries automatically
- No sensitive data should be stored without encryption

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

MIT License - feel free to use this project for any purpose.

## 👤 Author

Created as a learning project for webhook handling and serverless deployment.

## 🆘 Support

If you have questions or run into issues:
1. Check the [Vercel Documentation](https://vercel.com/docs)
2. Check the [Upstash Documentation](https://docs.upstash.com)
3. Open an issue on GitHub