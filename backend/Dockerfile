FROM python:3.12-slim

ENV PYTHONUNBUFFERED True
ENV APP_HOME /app
WORKDIR $APP_HOME
COPY . ./

RUN pip install --no-cache-dir -r requirements.txt
RUN pip install --no-cache-dir gunicorn

# Collect static files
RUN python manage.py collectstatic --noinput

CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 backend.wsgi:application
