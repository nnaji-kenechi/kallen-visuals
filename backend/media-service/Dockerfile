# Start with lightweight Linux + Node.js version 20
FROM node:20-alpine

# Create and enter /app 
WORKDIR /app

# Use the already installed packages
COPY package.json yarn.lock ./

# Install packages
RUN yarn install

# Copy the rest of your project (except ignored files)
COPY . .

# This tells docker the service is listening on port 4002
EXPOSE 4002

# Command exercuted when the container starts
CMD ["yarn","start"]
