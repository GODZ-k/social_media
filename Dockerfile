# Stage 1: Build the React app
FROM node:22.8.0 as build

# Set working directory for build
WORKDIR /social_media

# Copy client dependencies
COPY client/package*.json ./client/

# Install dependencies for the client
RUN npm install --prefix ./client

# Copy the rest of the client code and build it
COPY client ./client

# Build the React app
RUN npm run build --prefix ./client

# Stage 2: Setup Node.js server
FROM node:22.8.0

# Set working directory for server
WORKDIR /social_media

# Copy server dependencies
COPY server/package*.json ./server/

# Install dependencies for the server
RUN npm install --production --prefix ./server

# Copy the server code
COPY server ./server

# Copy the built React app from the build stage
COPY --from=build /social_media/client/dist ./server/public

# Expose the port
EXPOSE 5000

# Start the Node.js server
CMD ["node", "./server/index.js"]
