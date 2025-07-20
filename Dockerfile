FROM node:18-alpine
WORKDIR /app

# Install dependencies
COPY package.json .
COPY package-lock.json ./
RUN npm install

# Copy app and build
COPY . ./
RUN npm run build

# Expose the new port
EXPOSE 8000

# Run the app
CMD ["node", "./build/index.js"]
