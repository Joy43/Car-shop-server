# Use lightweight Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files first for better build caching
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy all project files
COPY . .

# Build TypeScript to JavaScript
RUN npm run build

# Expose app port
EXPOSE 3000

# Start the application
CMD ["npm","yarn", "start"]
