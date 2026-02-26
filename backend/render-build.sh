#!/usr/bin/env bash
# Exit on error
set -o errexit

echo "📦 Installing requirements..."
pip install --upgrade pip
pip install -r requirements.txt

echo "✨ Collecting static files..."
python manage.py collectstatic --noinput

echo "🗄️ Running migrations..."
python manage.py migrate --noinput

echo "🚀 Build complete!"
