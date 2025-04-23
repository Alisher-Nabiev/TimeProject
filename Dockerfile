FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY client/package*.json ./client/

# Install dependencies
RUN npm install --production
RUN cd client && npm install

# Copy the rest of the application
COPY . .

# Build the client
RUN cd client && npm run build

# Expose ports
EXPOSE 3001

# Start the application
CMD ["npm", "start"] 