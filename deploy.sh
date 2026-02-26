#!/bin/bash

# Configuration
PROJECT_ID="smartagro-c67f4"
REGION="us-central1"
SERVICE_NAME="smartagro-backend"
KEY_FILE="/home/azureuser/.openclaw/workspace/projects/smartagro/service-account.json"

# Credentials from render.yaml or env
SUPABASE_DB_URL="postgresql://postgres.dvtabjxxflpvyuarczcc:@Keshav2404@aws-1-ap-south-1.pooler.supabase.com:5432/postgres"
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"

echo "🚀 Starting deployment to Firebase/GCP for $PROJECT_ID..."

# Add tools to path
export PATH=$PATH:~/google-cloud-sdk/bin:~/npm-global/bin

# 1. Authenticate
echo "🔑 Authenticating with Service Account..."
gcloud auth activate-service-account --key-file=$KEY_FILE --project=$PROJECT_ID
export GOOGLE_APPLICATION_CREDENTIALS=$KEY_FILE

# 2. Enable necessary Google Cloud APIs
echo "📦 Enabling Google Cloud APIs..."
gcloud services enable run.googleapis.com containerregistry.googleapis.com cloudbuild.googleapis.com --project $PROJECT_ID

# 3. Build and Push the Docker image
echo "🛠 Building and pushing container image..."
cd /home/azureuser/.openclaw/workspace/projects/smartagro/backend
gcloud builds submit --tag gcr.io/$PROJECT_ID/$SERVICE_NAME --project $PROJECT_ID

# 4. Deploy to Cloud Run
echo "🚀 Deploying to Cloud Run..."
gcloud run deploy $SERVICE_NAME \
  --image gcr.io/$PROJECT_ID/$SERVICE_NAME \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --project $PROJECT_ID \
  --set-env-vars "DEBUG=False,ALLOWED_HOSTS=*,SUPABASE_DB_URL=$SUPABASE_DB_URL,GEMINI_API_KEY=$GEMINI_API_KEY"

# 5. Deploy to Firebase Hosting
echo "🌐 Deploying to Firebase Hosting..."
cd /home/azureuser/.openclaw/workspace/projects/smartagro
firebase deploy --only hosting --project $PROJECT_ID --non-interactive

echo "✅ Done! Your backend is now on Firebase/Cloud Run."
