# Use an official Python runtime as the base image
FROM python:3.12-slim

# Set the working directory in the container
WORKDIR /code

# set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV DJANGO_SETTINGS_MODULE=app.settings_production

# Copy the requirements file into container
COPY requirements.txt ./

# Install build tools and project dependencies, remove tools and cache after.
RUN apt update && apt upgrade -y && \
    apt install gcc musl-dev libpcre3 libpcre3-dev -y && \
    pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt && \
    apt clean autoclean && \
    apt autoremove --purge apt pip gcc musl-dev -y --allow-remove-essential && \
    rm -rf /var/lib/{apt,dpkg,cache,log,lists} ./requirements*.txt

# Copy over rest of the project after installing deps to optimize rebuilds
COPY ./src ./docker-entrypoint.sh ./

ENTRYPOINT [ "sh", "/code/docker-entrypoint.sh"]
