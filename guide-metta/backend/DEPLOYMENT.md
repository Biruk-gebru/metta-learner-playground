# Backend API Deployment Guide

This guide explains how to deploy the MeTTa Learner backend API on free platforms.

## Free Deployment Options

### 1. Render (Recommended)

Render offers a free tier with:
- 750 hours/month of runtime
- Automatic deployments from GitHub
- Custom domains
- SSL certificates

#### Steps to deploy on Render:

1. **Fork/Clone the repository** to your GitHub account

2. **Sign up for Render** at https://render.com

3. **Create a new Web Service**:
   - Connect your GitHub repository
   - Choose the `guide-metta/backend` directory
   - Set the following configuration:
     - **Build Command**: `pip install -r requirements.txt`
     - **Start Command**: `gunicorn app:app`
     - **Environment**: Python 3

4. **Set Environment Variables**:
   - `FRONTEND_URL`: Your frontend URL (e.g., `https://metta-learner-playground.vercel.app`)

5. **Deploy**: Click "Create Web Service"

### 2. Railway

Railway offers a free tier with:
- $5 credit monthly
- Automatic deployments
- Custom domains

#### Steps to deploy on Railway:

1. **Sign up for Railway** at https://railway.app

2. **Connect your GitHub repository**

3. **Create a new service** from the `guide-metta/backend` directory

4. **Set environment variables**:
   - `FRONTEND_URL`: Your frontend URL

5. **Deploy**: Railway will automatically detect the Python app and deploy

### 3. Heroku (Alternative)

Heroku offers a free tier with some limitations:
- Sleep after 30 minutes of inactivity
- 512MB RAM limit

#### Steps to deploy on Heroku:

1. **Install Heroku CLI**

2. **Create a new Heroku app**:
   ```bash
   heroku create your-app-name
   ```

3. **Set environment variables**:
   ```bash
   heroku config:set FRONTEND_URL=https://your-frontend-url.com
   ```

4. **Deploy**:
   ```bash
   git push heroku main
   ```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `FRONTEND_URL` | URL of your frontend application | `http://localhost:3000` |
| `PORT` | Port for the server to run on | `5000` (auto-detected by platforms) |

## Health Check

The API includes a health check endpoint at `/health` that returns:

```json
{
  "status": "healthy",
  "service": "metta-learner-api",
  "version": "1.0.0"
}
```

## CORS Configuration

The API is configured to accept requests from:
- `https://metta-learner-playground.vercel.app`
- `http://localhost:3000`
- `https://metta-learner.onrender.com`
- `https://metta-learner.railway.app`
- Any URL specified in the `FRONTEND_URL` environment variable

## Updating Frontend Configuration

After deploying the backend, update your frontend to use the new API URL:

1. **For Vercel deployment**: Add environment variable `NEXT_PUBLIC_API_URL`
2. **Update the API calls** in your frontend code to use the new URL

## Troubleshooting

### Common Issues:

1. **Build fails**: Check that all dependencies are in `requirements.txt`
2. **CORS errors**: Verify the `FRONTEND_URL` environment variable is set correctly
3. **MeTTa import error**: Ensure the `hyperon` package is properly installed
4. **Memory issues**: The free tier has memory limits, consider optimizing the code

### Logs:

- **Render**: Check the logs in the Render dashboard
- **Railway**: Use `railway logs` command
- **Heroku**: Use `heroku logs --tail` command

## Cost Optimization

- Use the free tier limits effectively
- Consider implementing request caching
- Optimize MeTTa code execution time
- Monitor usage to stay within free tier limits 