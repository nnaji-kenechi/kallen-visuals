# ==========================================
# STAGE 1: BUILD THE FRONTEND APPLICATION
# ==========================================

# Start with an official Node.js 24 image based on Alpine Linux.
# Alpine is a very small Linux distribution, which keeps the image lightweight.
# We need Node because Vite and React require it to install packages and build the app.
FROM node:24-alpine AS builder

# Set the working directory inside the container to /app.
# If /app doesn't exist, Docker creates it automatically.
# All following commands will execute from this directory.
WORKDIR /app

# Copy only package.json and yarn.lock first.
# This allows Docker to cache the dependency installation.
# If only your source code changes later, Docker won't reinstall packages,
# making future builds much faster.
COPY package.json yarn.lock ./

# Configure Yarn to use the official npm registry.
RUN yarn config set registry https://registry.npmjs.org

# Install all frontend dependencies exactly as specified in yarn.lock.
# --frozen-lockfile prevents accidental changes to the lock file and
# guarantees consistent installations across all environments.
RUN yarn install --frozen-lockfile

# Copy the rest of the project into the container.
# This includes src/, public/, vite.config.js, etc.
COPY . .

# Build the React/Vite application for production.
# This creates the optimized dist/ folder that will be served to users.
RUN yarn build


# ==========================================
# STAGE 2: SERVE THE APPLICATION
# ==========================================

# Start with the official Nginx image.
# Nginx is a fast, lightweight web server used to serve static websites.
FROM nginx:alpine

# Copy only the built frontend (dist/) from the builder stage
# into Nginx's default web directory.
# This means the final image contains ONLY the finished website,
# not the source code or Node.js.
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 because Nginx listens on port 80 by default.
EXPOSE 80

# Start Nginx in the foreground.
# Docker containers should keep one main process running.
CMD ["nginx", "-g", "daemon off;"]
